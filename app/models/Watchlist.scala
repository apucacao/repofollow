package org.albatross.repofollow
package models

import play.api.libs.json._

case class Branch(
  sha: String,
  name: String)

case class Repository(
  id: Long, // GitHub id
  name: String,
  owner: String,
  description: Option[String] = None,
  branches: List[Branch] = Nil) {

  lazy val fullName = s"$name/$owner"
}

object Repository {
  implicit val BranchFormat = Json.format[Branch]
  implicit val RepositoryFormat = Json.format[Repository]
}

case class Watchlist(
  repositories: List[Repository] = Nil) {

  def isEmpty = repositories.isEmpty
}

object Watchlist {
  def empty = Watchlist()

  implicit val WatchlistFormat = Json.format[Watchlist]
}