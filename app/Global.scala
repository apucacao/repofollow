import securesocial.core.RuntimeEnvironment

import org.albatross.repofollow.models.User
import org.albatross.repofollow.services.MongoUserService

import controllers.CustomRoutesService

import java.lang.reflect.Constructor
import scala.collection.immutable.ListMap
import securesocial.core._, providers._

object Global extends play.api.GlobalSettings {

  object MyRuntimeEnvironment extends RuntimeEnvironment.Default[User] {
    override lazy val routes = new CustomRoutesService()
    override lazy val userService = new MongoUserService()
    override lazy val providers = ListMap(
      include(new GitHubProvider(routes, cacheService, oauth2ClientFor(GitHubProvider.GitHub)))
    )
  }

  override def getControllerInstance[A](controllerClass: Class[A]): A = {
    val instance  = controllerClass.getConstructors.find { c =>
      val params = c.getParameterTypes
      params.length == 1 && params(0) == classOf[RuntimeEnvironment[User]]
    }.map {
      _.asInstanceOf[Constructor[A]].newInstance(MyRuntimeEnvironment)
    }
    instance.getOrElse(super.getControllerInstance(controllerClass))
  }
}