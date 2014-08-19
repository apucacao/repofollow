package org.albatross.repofollow
package models

import scalaz._, Scalaz._

import play.api._
import play.api.libs.json._

import securesocial.core._

case class UserId(providerId: String, userId: String)

object UserId {
  implicit val UserIdFormat = Json.format[UserId]
}

case class User(
  _id: UserId,
  firstName: Option[String],
  lastName: Option[String],
  fullName: Option[String],
  email: Option[String],
  avatarUrl: Option[String],
  oAuth2Info: OAuth2Info,
  watchlist: Watchlist) {

  def isWatching(repo: Repository) = watchlist.contains(repo)

  def isNotWatchingAnything = watchlist.isEmpty

  def saveToWatchlist(repo: Repository) = copy(watchlist = watchlist.put(repo))

  def removeFromWatchlist(id: Long) = copy(watchlist = watchlist.drop(id))
}

object User {
  // required for SecureSocial UserService
  def toBasicProfile(user: User) = BasicProfile(
    providerId = user._id.providerId,
    userId = user._id.userId,
    firstName = user.firstName,
    lastName = user.lastName,
    fullName = user.fullName,
    email = user.email,
    avatarUrl = user.avatarUrl,
    authMethod = AuthenticationMethod.OAuth2,
    oAuth1Info = None,
    oAuth2Info = Some(user.oAuth2Info),
    passwordInfo = None)

  def fromBasicProfile(profile: BasicProfile) = User(
    UserId(profile.providerId, profile.userId),
    profile.firstName,
    profile.lastName,
    profile.fullName,
    profile.email,
    profile.avatarUrl,
    profile.oAuth2Info.get, // since we're using Github we must have OAuth2 details
    Watchlist())

  implicit val OAuth1InfoFormat = Json.format[OAuth1Info]
  implicit val OAuth2InfoFormat = Json.format[OAuth2Info]
  implicit val PasswordInfoFormat = Json.format[PasswordInfo]
  implicit val AuthenticationMethodFormat = Json.format[AuthenticationMethod]
  implicit val UserFormat = Json.format[User]
}