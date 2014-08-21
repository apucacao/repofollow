package org.albatross.repofollow
package actors

import models.User
import lib.GitHub
import db.{EventStore, UserStore}

import scalaz._, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.Play.current
import play.api.libs.concurrent.Akka
import play.modules.reactivemongo._

import akka.actor._

object GetLatestUserEvents {
  val actor = Akka.system.actorOf(Props[GetLatestUserEvents])

  def apply(user: User) =
    actor ! ForUser(user)
}

class GetLatestUserEvents extends Actor with ActorLogging {
  lazy val db = ReactiveMongoPlugin.db

  def receive = {
    case ForUser(user: User) => getEventsForUser(user)
    case ForAllUsers => getEventsForAllUsers
  }

  def getEventsForUser(user: User) = GitHub.getLatestEventsForUser(user)

  def getEventsForAllUsers =
    for {
      users <- UserStore.findAll(db)
      events <- users.traverse(getEventsForUser).map(_.join)
    } yield Logger.info(s"Got ${events.size} new events")
}

case class ForAllUsers()
case class ForUser(user: User)