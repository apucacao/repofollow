package org.albatross.repofollow
package db

import models._

import scalaz.{Index => _, _}, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api.libs.json._

import reactivemongo.api._, indexes._
import play.modules.reactivemongo.json.collection.JSONCollection

object RequestStore {
	private[this] def collection(db: DefaultDB) = db.collection[JSONCollection]("requests")

	def ensureIndexes(db: DefaultDB): Future[Unit] = {
    val indexes = collection(db).indexesManager

    for {
      _ <- indexes.ensure(Index(key = List("repoId" -> IndexType.Ascending, "branch" -> IndexType.Ascending), unique = true))
    } yield ()
  }

  def find(db: DefaultDB, repoId: GithubRepositoryId, branch: Option[CommitSha] = None) =	{
  	val query = Json.obj("repoId" -> repoId) ++ branch.map(b => Json.obj("branch" -> b)).getOrElse(Json.obj())
  	collection(db).find(query).one[Request]
  }

  def save(db: DefaultDB, request: Request): Future[Request] =
  	collection(db).save(request).map(_ => request)
}
