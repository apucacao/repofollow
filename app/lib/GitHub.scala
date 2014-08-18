package org.albatross.repofollow
package lib

import models._

import scalaz._, Scalaz._
import scalaz.contrib.nscala_time._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import com.github.nscala_time.time.Imports._

import play.api._
import play.api.libs.ws._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.Play.current

object GitHub {

	val contentType = "application/vnd.github.v3+json"

	lazy val auth = Map(
		"client_id" -> Play.current.configuration.getString("securesocial.github.clientId").get,
		"client_secret" -> Play.current.configuration.getString("securesocial.github.clientSecret").get,
		"per_page" -> "5")

	implicit val BranchReads: Reads[Branch] = (
    (__ \ "commit" \ "sha").read[String] and
    (__ \ "name").read[String]
  )(Branch.apply _)

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

  def getRepositoryCommits(repo: Repository): Future[List[Commit]] =
  	WS.url(url(s"/repos/${repo.fullName}/commits"))
  		.withHeaders("Accept" -> contentType)
  		.withQueryString(params(): _*)
  		.get().map { resp =>
  			Logger.info(s"get commits for ${repo.fullName} rate limit: ${resp.header("X-RateLimit-Remaining").get}/${resp.header("X-RateLimit-Limit").get}")
  			resp.json.as[List[Commit]]
			}

  def getEvents(repo: Repository, branch: Option[Branch] = None): Future[List[Event]] = {
    getRepositoryCommits(repo).map(_.map(Event(_, repo, branch)))
  }
}