package org.albatross.repofollow
package services

import models.User
import db.UserStore

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import securesocial.core._, services._, providers._
import play.api.Play.current
import play.modules.reactivemongo._

class MongoUserService extends UserService[User] {
  lazy val db = ReactiveMongoPlugin.db

  def find(providerId: String, userId: String): Future[Option[BasicProfile]] =
    UserStore.findByProviderUserId(db, providerId, userId).map(_.map(User.toBasicProfile))

  def save(profile: BasicProfile, mode: SaveMode): Future[User] =
    UserStore.save(db, User.fromBasicProfile(profile))

  // no required
  def deleteExpiredTokens(): Unit = ???
  def deleteToken(uuid: String): Future[Option[MailToken]] = ???
  def findToken(token: String): Future[Option[MailToken]] = ???
  def findByEmailAndProvider(email: String, providerId: String): Future[Option[BasicProfile]] = ???
  def link(current: User, to: BasicProfile): Future[User] = ???
  def passwordInfoFor(user: User): Future[Option[PasswordInfo]] = ???
  def saveToken(token: MailToken): Future[MailToken] = ???
  def updatePasswordInfo(user: User, info: PasswordInfo): Future[Option[BasicProfile]] = ???
}