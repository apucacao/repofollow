import securesocial.core.RuntimeEnvironment

import org.albatross.repofollow.models.User
import org.albatross.repofollow.services.MongoUserService
import org.albatross.repofollow.db._
import org.albatross.repofollow.actors._

import controllers.CustomRoutesService

import scalaz._, Scalaz._

import java.lang.reflect.Constructor
import scala.collection.immutable.ListMap

import scala.concurrent._
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.Play.current
import play.modules.reactivemongo._
import play.api.libs.concurrent.Akka
import akka.actor._

import securesocial.core._, providers._

object Global extends play.api.GlobalSettings {

  override def onStart(app: Application) {
    ensureIndexes()
  }

  def scheduleGettingLatestEvents = {
    val frequency = Play.configuration.getInt("getLatestEvents.frequency").getOrElse(1).hours
    val actor = Akka.system.actorOf(Props[GetLatestUserEvents], name = "GetLatestUserEvents")
    Akka.system.scheduler.schedule(0.seconds, frequency, actor, ForAllUsers)
  }

  def ensureIndexes() = {
    val db = ReactiveMongoPlugin.db

    for {
      _ <- UserStore.ensureIndexes(db)
      _ <- RequestStore.ensureIndexes(db)
      _ <- EventStore.ensureIndexes(db)
    } yield Logger.info("Ensured indexes")
  }

  // SecureSocial specific
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