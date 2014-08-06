package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def setup = Action {
    Ok(views.html.setup())
  }

  def stream = Action {
    Ok(views.html.stream())
  }

  def settings = Action {
    Ok(views.html.settings())
  }

}