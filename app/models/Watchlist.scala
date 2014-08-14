package org.albatross.repofollow
package models

import scalaz._, Scalaz._

import play.api._
import play.api.libs.json._

// Abstraction of a list of repos. Could grow into a broader abstractions, one that
// includes users for example.
case class Watchlist(
	repos: List[Repository] = Nil) {

	def isEmpty = repos.isEmpty

	def contains(repo: Repository) =
		repos.exists(_.id === repo.id)

	def put(repo: Repository) = {
		def update(old: Repository) =
			old.copy(
				name = repo.name,
				owner = repo.owner,
				description = repo.description,
				branches = repo.branches
			)

		val updated = repos.find(_.id === repo.id).map(update).getOrElse(repo)
		copy(repos = updated :: repos.filter(_.id =/= repo.id))
	}

	def drop(id: Long) =
		copy(repos = repos.filter(_.id =/= id))

}

object Watchlist {
	implicit val WatchlistFormat = Json.format[Watchlist]
}