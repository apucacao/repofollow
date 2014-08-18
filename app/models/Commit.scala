package org.albatross.repofollow
package models

import scalaz._, Scalaz._
import scalaz.contrib.nscala_time._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import com.github.nscala_time.time.Imports._

case class CommitUser(
  login: String,
  avatarUrl: String)

case class Commit(
  sha: String,
  message: String,
  date: DateTime,
  committer: CommitUser)

object Commit {
  implicit val dateTimeReads = Reads.jodaDateReads("yyyy-MM-dd'T'HH:mm:ss'Z'")
  implicit val dateTimeWrites = Writes.jodaDateWrites("yyyy-MM-dd'T'HH:mm:ss'Z'")

  implicit val CommitUserWrites = Json.writes[CommitUser]

  implicit val CommitUserReads: Reads[CommitUser] = (
      (__ \ "login").read[String] and
      (__ \ "avatar_url").read[String]
  )(CommitUser.apply _)

  implicit val CommitWrites = Json.writes[Commit]

  implicit val CommitReads: Reads[Commit] = (
    (__ \ "sha").read[String] and
    (__ \ "commit" \ "message").read[String] and
    (__ \ "commit" \ "committer" \ "date").read[DateTime] and
    (__ \ "committer").read[CommitUser]
  )(Commit.apply _)

  def commitDateSort = Order.orderBy((c: Commit) => c.date).reverseOrder
  implicit def defaultCommitOrdering = commitDateSort.toScalaOrdering
}