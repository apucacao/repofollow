package controllers

import org.albatross.repofollow.lib.GitHub

import scalaz._, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.mvc._
import play.api.libs.json._

// Simple GitHub proxy to increase rate limit by sending OAuth2 key/secret
// See https://developer.github.com/v3/#rate-limiting
object GitHubProxy extends Controller {

  def searchRepositories = Action.async { implicit request =>
    val q = request.queryString.get("q").flatMap(_.headOption)

    q.cata(
      some = GitHub.searchRepositoriesWithBranches(_).map(results => Ok(Json.toJson(results))),
      none = Future { BadRequest }
    )
  }

}