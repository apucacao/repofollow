package org.albatross.repofollow
package db

import models._

import scalaz.{Index => _, _}, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api.libs.json._
import play.api.libs.iteratee._

import reactivemongo.api._, indexes._
import play.modules.reactivemongo.json.collection.JSONCollection

object EventStore {
  private[this] def collection(db: DefaultDB) = db.collection[JSONCollection]("events")

  def ensureIndexes(db: DefaultDB): Future[Unit] = {
    val indexes = collection(db).indexesManager

    for {
      _ <- indexes.ensure(Index(key = List("userId" -> IndexType.Ascending)))
    } yield ()
  }

  def findByUser(db: DefaultDB, userId: UserId): Future[List[Event]] =
    collection(db).find(Json.obj("userId" -> userId)).sort(Json.obj("commit.date" -> -1)).cursor[Event].collect[List]()

  def insert(db: DefaultDB, events: List[Event]) = {
    val enumerator = Enumerator.enumerate(events)
    collection(db).bulkInsert(enumerator)
  }
}

