package org.albatross.repofollow
package db

import models._

import scalaz.{Index => _, _}, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api.libs.json._

import reactivemongo.api._, indexes._
import play.modules.reactivemongo.json.collection.JSONCollection

import com.github.nscala_time.time.Imports._

object RequestStore {
  import Request._

  private[this] def collection(db: DefaultDB) = db.collection[JSONCollection]("requests")

  def ensureIndexes(db: DefaultDB): Future[Unit] = {
    val indexes = collection(db).indexesManager

    for {
      _ <- indexes.ensure(Index(key = List("repoId" -> IndexType.Ascending, "branch" -> IndexType.Ascending), unique = true))
    } yield ()
  }

  def findById(db: DefaultDB, requestId: RequestId) = {
    collection(db).find(Json.obj("_id" -> requestId)).one[Request]
  }

  def save(db: DefaultDB, request: Request): Future[Request] = {
    collection(db).save(request).map(_ => request)
  }
}