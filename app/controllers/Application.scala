package controllers

import org.albatross.repofollow.models._

import play.api._
import play.api.mvc._

import securesocial.core._
import securesocial.core.services.RoutesService

class Application(override implicit val env: RuntimeEnvironment[User]) extends SecureSocial[User] {

  def index = UserAwareAction { implicit request =>
    val firstTime = request.user.map(_.watchlist.isEmpty).getOrElse(true)

    if (request.user.isDefined)
      Redirect(if (firstTime) routes.Application.setup() else routes.Application.stream())
    else
      Ok(views.html.index())
  }

  def setup = SecuredAction { implicit request =>
    Ok(views.html.setup(request.user))
  }

  def settings = SecuredAction { implicit request =>
    Ok(views.html.settings(request.user))
  }

  def stream = SecuredAction { implicit request =>
    Ok(views.html.stream(request.user))
  }

}

class CustomRoutesService extends RoutesService.Default {
  // our login page is simply the app index
  override def loginPageUrl(implicit req: RequestHeader): String = controllers.routes.Application.index().absoluteURL(IdentityProvider.sslEnabled)
}