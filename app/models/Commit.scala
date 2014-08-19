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

  implicit val CommitUserFormat = Json.format[CommitUser]
  implicit val CommitFormat = Json.format[Commit]
}