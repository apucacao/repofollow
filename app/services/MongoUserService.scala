package org.albatross.repofollow
package services

import models.{UserId, User}
import db.UserStore

import scalaz._, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import securesocial.core._, services._, providers._
import play.api.Play.current
import play.modules.reactivemongo._

class MongoUserService extends UserService[User] {
  lazy val db = ReactiveMongoPlugin.db

  def find(providerId: String, userId: String): Future[Option[BasicProfile]] =
    UserStore.findById(db, UserId(providerId, userId)).map(_.map(User.toBasicProfile))

  def save(profile: BasicProfile, mode: SaveMode): Future[User] = {
    def updateFromProfile(user: User) =
      user.copy(
        firstName = profile.firstName,
        lastName = profile.lastName,
        fullName = profile.fullName,
        email = profile.email,
        avatarUrl = profile.avatarUrl,
        oAuth2Info = profile.oAuth2Info.get)

    for {
      user <- UserStore.findById(db, UserId(profile.providerId, profile.userId))
      saved <- user.cata(some = u => UserStore.save(db, updateFromProfile(u)),
                     none = UserStore.save(db, User.fromBasicProfile(profile)))
    } yield saved
  }

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