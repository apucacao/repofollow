package org.albatross.repofollow
package lib

import models._

import scalaz._, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.libs.ws._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.Play.current

object GitHub {

	val contentType = "application/vnd.github.v3+json"

	lazy val auth = Map(
		"client_id" -> Play.current.configuration.getString("securesocial.github.clientId").get,
		"client_secret" -> Play.current.configuration.getString("securesocial.github.clientSecret").get)

	implicit val BranchReads: Reads[Branch] = (
    (__ \ "commit" \ "sha").read[String] and
    (__ \ "name").read[String]
  )(Branch.apply _)

	def url(path: String) = s"""https://api.github.com${if (path.startsWith("/")) path else ("/" + path)}"""

	def params(p: (String, String)*) = (auth ++ p.toMap).toSeq

	// TODO: use cache and cond. requests using GitHub's ETag to reduce chance of getting rate-limited
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
      .get().map(_.json.as[GitHubSearchResults])

  def getRepositoryBranches(repo: Repository): Future[List[Branch]] =
  	WS.url(url(s"/repos/${repo.owner.login}/${repo.name}/branches"))
      .withHeaders("Accept" -> contentType)
      .withQueryString(params(): _*)
      .get().map(_.json.asOpt[List[Branch]]).map(_.getOrElse(Nil))

}