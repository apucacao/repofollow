package org.albatross.repofollow
package actors

import models.User
import lib.GitHub
import db.EventStore

import scalaz._, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api.Play.current
import play.modules.reactivemongo._

import play.api.libs.concurrent.Akka
import akka.actor._

object GetLatestUserEvents {
	val actor = Akka.system.actorOf(Props[GetLatestUserEvents])

	def apply(user: User) =
		actor ! user
}

// class GetLatestUserEvents(out: ActorRef) extends Actor with ActorLogging {
class GetLatestUserEvents extends Actor with ActorLogging {
	def receive = {
		case user: User => getEventsFor(user)
	}

	def getEventsFor(user: User) = GitHub.getLatestEventsForUser(user)
}

case class GetLatestUserEventsMessageForUser(user: User)