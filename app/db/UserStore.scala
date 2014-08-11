package org.albatross.repofollow
package db

import models._

import scalaz.{Index => _, _}, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api.libs.json._

import reactivemongo.api._, indexes._
import play.modules.reactivemongo.json.collection.JSONCollection

object UserStore {
  import User._

  private[this] def collection(db: DefaultDB) = db.collection[JSONCollection]("users")

  def ensureIndexes(db: DefaultDB): Future[Unit] = {
    val indexes = collection(db).indexesManager

    for {
      _ <- indexes.ensure(Index(key = List("watchlist.id" -> IndexType.Ascending), unique = true))
      _ <- indexes.ensure(Index(key = List("watchlist.branches.sha" -> IndexType.Ascending), unique = true))
    } yield ()
  }

  def first(db: DefaultDB): Future[Option[User]] =
    collection(db).find(Json.obj()).one[User]

  def findById(db: DefaultDB, userId: UserId): Future[Option[User]] =
    collection(db).find(Json.obj("_id" -> userId)).one[User]

  def save(db: DefaultDB, user: User): Future[User] =
    collection(db).save(user).map(_ => user)
}