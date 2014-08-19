package org.albatross.repofollow
package models

import scalaz._, Scalaz._
import scalaz.contrib.nscala_time._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import com.github.nscala_time.time.Imports._

case class Request(
	etag: String,
  repoId: GithubRepositoryId,
  branch: Option[CommitSha] = None)

object Request {
  implicit val EventFormat = Json.format[Request]
}
