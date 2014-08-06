package org.albatross.repofollow
package db

import models._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api.libs.json._

import reactivemongo.api._
import play.modules.reactivemongo.json.collection.JSONCollection

object UserStore {
  import User._

  private[this] def collection(db: DefaultDB) = db.collection[JSONCollection]("users")

  def findByProviderUserId(db: DefaultDB, providerId: String, userId: String): Future[Option[User]] =
    collection(db).find(Json.obj("providerId" -> providerId, "userId" -> userId)).one[User]

  def save(db: DefaultDB, user: User): Future[User] =
    collection(db).save(user).map(_ => user)
}