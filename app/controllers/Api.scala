package controllers

import org.albatross.repofollow.models._
import org.albatross.repofollow.db._
import org.albatross.repofollow.lib._

import scalaz._, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.Play.current
import play.modules.reactivemongo._

import securesocial.core._
class Api(override implicit val env: RuntimeEnvironment[User]) extends SecureSocial[User] {
  lazy val db = ReactiveMongoPlugin.db

  def getWatchlist = SecuredAction.async { implicit request =>
    Future(Ok(Json.toJson(request.user.watchlist)))
  }

  def addToWatchlist = SecuredAction.async(jsonBody[Repository]) { implicit request =>
    val user = request.user
    val repository = request.body
    UserStore.save(db, user.watch(repository)).map(_ => NoContent)
  }
}