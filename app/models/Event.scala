package org.albatross.repofollow
package models

import scalaz._, Scalaz._
import scalaz.contrib.nscala_time._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import com.github.nscala_time.time.Imports._

case class Event(
  commit: Commit,
  repo: Repository,
  branch: Option[Branch] = None)

object Event {
  implicit val RepositoryWrites: Writes[Repository] = (
    (__ \ "name").write[String] and
    (__ \ "owner").write[String]
  )((r: Repository) => (r.name, r.owner.login))

  implicit val EventFormat = Json.format[Event]

  def eventDateSort = Order.orderBy((e: Event) => e.commit.date).reverseOrder
  implicit def defaultCommitOrdering = eventDateSort.toScalaOrdering
}