package org.albatross.repofollow
package lib

import models._
import db.{RequestStore, EventStore}

import scalaz._, Scalaz._
import scalaz.contrib.nscala_time._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import com.github.nscala_time.time.Imports._

import play.api._
import play.api.http.Status._
import play.api.libs.ws._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.Play.current
import play.modules.reactivemongo._

object GitHub {
  lazy val db = ReactiveMongoPlugin.db

	val contentType = "application/vnd.github.v3+json"

	lazy val auth = Map(
		"client_id" -> Play.current.configuration.getString("securesocial.github.clientId").get,
		"client_secret" -> Play.current.configuration.getString("securesocial.github.clientSecret").get,
		"per_page" -> "5")

  implicit val dateTimeReads = Reads.jodaDateReads("yyyy-MM-dd'T'HH:mm:ss'Z'")
  implicit val dateTimeWrites = Writes.jodaDateWrites("yyyy-MM-dd'T'HH:mm:ss'Z'")

	implicit val BranchReads: Reads[Branch] = (
    (__ \ "commit" \ "sha").read[String] and
    (__ \ "name").read[String]
  )(Branch.apply _)

  implicit val CommitUserReads: Reads[CommitUser] = (
      (__ \ "login").read[String] and
      (__ \ "avatar_url").read[String]
  )(CommitUser.apply _)

  implicit val CommitReads: Reads[Commit] = (
    (__ \ "sha").read[String] and
    (__ \ "commit" \ "message").read[String] and
    (__ \ "commit" \ "committer" \ "date").read[DateTime] and
    (__ \ "committer").read[CommitUser]
  )(Commit.apply _)

	def url(path: String) = s"""https://api.github.com${if (path.startsWith("/")) path else ("/" + path)}"""

	def params(p: (String, String)*) = (auth ++ p.toMap).toSeq

	// TODO: use cache and cond. requests using GitHub's ETag to reduce chance of getting rate-limited
	// TODO: handle rate-limit errors
	def searchRepositoriesWithBranches(q: String): Future[GitHubSearchResults] = {
		def augment(r: Repository): Future[Repository] =
			for {
				branches <- getRepositoryBranches(r)
			} yield r.copy(branches = branches)

		for {
			results <- searchRepositories(q)
			reposWithBranches <- results.items.traverse(augment)
		} yield results.copy(items = reposWithBranches)
	}

	def searchRepositories(q: String): Future[GitHubSearchResults] =
    WS.url(url("/search/repositories"))
      .withHeaders("Accept" -> contentType)
      .withQueryString(params("q" -> q): _*)
      .get().map { resp =>
      	Logger.info(s"search repos rate limit: ${resp.header("X-RateLimit-Remaining").get}/${resp.header("X-RateLimit-Limit").get}")
      	resp.json.as[GitHubSearchResults]
      }

  def getRepositoryBranches(repo: Repository): Future[List[Branch]] =
  	WS.url(url(s"/repos/${repo.fullName}/branches"))
      .withHeaders("Accept" -> contentType)
      .withQueryString(params(): _*)
      .get().map { resp =>
      	Logger.info(s"get branches for ${repo.fullName} rate limit: ${resp.header("X-RateLimit-Remaining").get}/${resp.header("X-RateLimit-Limit").get}")
      	resp.json.asOpt[List[Branch]]
      }.map(_.getOrElse(Nil))

  def getLatestEventsForRepository(user: User, repo: Repository): Future[List[Event]] = {
    def getRepoEvents =
      getRepositoryCommits(repo).map(_.map(_.map(Event(user._id, _, repo.toSummary))))

    def getBranchEvents(b: Branch) =
      getRepositoryCommits(repo, Some(b.sha)).map(_.map(_.map(Event(user._id, _, repo.toSummary, Some(b)))))

    for {
      events <- if (repo.branches.isEmpty) getRepoEvents else repo.branches.traverse(getBranchEvents).map(_.sequence.map(_.flatten))
      _ <- events.traverse(EventStore.insert(db, _))
    } yield events.getOrElse(Nil)
  }

  def getLatestEventsForUser(user: User): Future[List[Event]] =
    user.watchlist.repos.map(GitHub.getLatestEventsForRepository(user, _)).sequence.map(_.flatten)

  private def getRepositoryCommits(repo: Repository, sha: Option[CommitSha] = None): Future[Option[List[Commit]]] = {
    val qs = sha.map(s => params("sha" -> s)).getOrElse(params())
    val requestId = RequestId(repo.id, sha)

    def log(resp: WSResponse) =
      Logger.info(s"${repo.fullName}${sha.map("#" + _).getOrElse("")} rate limit: ${resp.header("X-RateLimit-Remaining").get}/${resp.header("X-RateLimit-Limit").get}")

    def sendRequest(etag: Option[ETag]) = {
      val headers = Map("Accept" -> contentType) ++ etag.map(t => Map("If-None-Match" -> t)).getOrElse(Map.empty)

      WS.url(url(s"/repos/${repo.fullName}/commits"))
        .withHeaders(headers.toSeq: _*)
        .withQueryString(qs: _*)
        .get()
    }

    for {
      etag <- RequestStore.findById(db, requestId).map(_.map(_.etag))
      response <- sendRequest(etag)
      _ = log(response)
      _ <- response.header("ETag").traverse(tag => RequestStore.save(db, requestId, tag))
      result = if (response.status === NOT_MODIFIED) None else Some(response.json.as[List[Commit]])
    } yield result
  }
}