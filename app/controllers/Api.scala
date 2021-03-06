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

  def getCommits = SecuredAction.async { implicit request =>
    Future(NotImplemented)
  }

  def getWatchlist = SecuredAction.async { implicit request =>
    Future(Ok(Json.toJson(request.user.watchlist)))
  }

  def updateWatchlistItem(id: Long) = SecuredAction.async(jsonBody[Repository]) { implicit request =>
    val repository = request.body

    for {
      user    <- UserStore.findById(db, request.user._id).orStopWith(NotFound)
      updated <- UserStore.save(db, user.saveToWatchlist(repository))
    } yield Ok(Json.toJson(updated.watchlist))
  }

  def removeWatchlistItem(id: Long) = SecuredAction.async { implicit request =>
    for {
      user    <- UserStore.findById(db, request.user._id).orStopWith(NotFound)
      updated <- UserStore.save(db, user.removeFromWatchlist(id))
    } yield Ok(Json.toJson(updated.watchlist))
  }

  def unseen = SecuredAction.async { implicit request =>
    for {
      user <- UserStore.findById(db, request.user._id).orStopWith(NotFound)
    } yield if (user.unseenEventCount === 0) NotModified else Ok(Json.obj("count" -> user.unseenEventCount))
  }
}