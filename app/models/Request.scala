package org.albatross.repofollow
package models

import scalaz._, Scalaz._
import scalaz.contrib.nscala_time._

import play.api.libs.json._
import play.api.libs.functional.syntax._

import com.github.nscala_time.time.Imports._

case class RequestId(repoId: GitHubRepositoryId, branch: Option[CommitSha])

case class Request(_id: RequestId, etag: ETag)

object Request {
	implicit val RequestIdFormat = Json.format[RequestId]
  implicit val RequestFormat = Json.format[Request]
}
