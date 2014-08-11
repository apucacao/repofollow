package org.albatross.repofollow
package models

import scalaz._, Scalaz._

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Branch(sha: CommitSha, name: String)

object Branch {
  implicit val BranchFormat = Json.format[Branch]
}

case class RepositoryOwner(login: String)

case class Repository(
  id: GithubRepositoryId,
  name: String,
  owner: RepositoryOwner,
  description: Option[String] = None,
  branches: List[Branch] = Nil) {

  lazy val fullName = s"$name/${owner.login}"

  def hasBranch(branch: Branch) = branches.exists(_.sha === branch.sha)

  def branchShas = branches.map(_.sha)
}

object Repository {
  implicit val RepositoryOwnerFormat = Json.format[RepositoryOwner]

  implicit val RepositoryWrites = Json.writes[Repository]

  implicit val RepositoryReads: Reads[Repository] = (
    (__ \ "id").read[GithubRepositoryId] and
    (__ \ "name").read[String] and
    (__ \ "owner").read[RepositoryOwner] and
    (__ \ "description").readNullable[String] and
    (__ \ "branches").read[List[Branch]].orElse(Reads.pure(List.empty))
  )(Repository.apply _)
}