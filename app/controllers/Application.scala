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
import securesocial.core.services.RoutesService

class Application(override implicit val env: RuntimeEnvironment[User]) extends SecureSocial[User] {
  lazy val db = ReactiveMongoPlugin.db

  def index = UserAwareAction.async { implicit request =>
    for {
      user <- request.user.traverse(u => UserStore.findById(db, u._id)).map(_.flatten)
      result = user.cata(some = u => Redirect(if (u.isNotWatchingAnything) routes.Application.setup() else routes.Application.stream()),
                         none = Ok(views.html.index(request)))
    } yield result
  }

  def setup = SecuredAction.async { implicit request =>
    for {
      user <- UserStore.findById(db, request.user._id)
      result = user.cata(some = u => Ok(views.html.setup(u)),
                         none = NotFound)
    } yield result
  }

  def settings = SecuredAction.async { implicit request =>
    for {
      user <- UserStore.findById(db, request.user._id)
      result = user.cata(some = u => Ok(views.html.settings(u)),
                         none = NotFound)
    } yield result
  }

  def stream = SecuredAction.async { implicit request =>
    for {
      user <- UserStore.findById(db, request.user._id)
      repo <- user.flatMap(_.watchlist.repos.headOption).point[Future]
      commits <- repo.traverse(r => GitHub.getEvents(r, r.branches.headOption))
      result = user.cata(some = u => Ok(views.html.stream(u, commits.getOrElse(Nil))),
                         none = NotFound)
    } yield result
  }

}

class CustomRoutesService extends RoutesService.Default {
  // our login page is simply the app index
  override def loginPageUrl(implicit req: RequestHeader): String = controllers.routes.Application.index().absoluteURL(IdentityProvider.sslEnabled)
}