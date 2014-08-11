package controllers

import org.albatross.repofollow.models._
import org.albatross.repofollow.db.UserStore

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.mvc._
import play.api.Play.current
import play.modules.reactivemongo._

import securesocial.core._
import securesocial.core.services.RoutesService

class Application(override implicit val env: RuntimeEnvironment[User]) extends SecureSocial[User] {
  lazy val db = ReactiveMongoPlugin.db

  def index = UserAwareAction { implicit request =>
    val firstTime = request.user.map(_.watchlist.isEmpty).getOrElse(true)

    println(s"first time user: $firstTime")

    if (request.user.isDefined)
      Redirect(if (firstTime) routes.Application.setup() else routes.Application.settings())
    else
      Ok(views.html.index(request))
  }

  // FIXME: user.get

  def setup = SecuredAction.async { implicit request =>
    UserStore.findById(db, request.user._id).flatMap(user => Future(Ok(views.html.setup(user.get))))
  }

  def settings = SecuredAction.async { implicit request =>
    UserStore.findById(db, request.user._id).flatMap(user => Future(Ok(views.html.settings(user.get))))
  }

  def stream = SecuredAction { implicit request =>
    Ok(views.html.stream(request.user))
  }

}

class CustomRoutesService extends RoutesService.Default {
  // our login page is simply the app index
  override def loginPageUrl(implicit req: RequestHeader): String = controllers.routes.Application.index().absoluteURL(IdentityProvider.sslEnabled)
}