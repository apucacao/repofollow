package org.albatross.repofollow
package models

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class GitHubSearchResults(
  count: Int,
  items: List[Repository])

object GitHubSearchResults {
  implicit val GitHubSearchResultsReads: Reads[GitHubSearchResults] = (
    (__ \ "total_count").read[Int] and
    (__ \ "items").read[List[Repository]]
  )(GitHubSearchResults.apply _)

  implicit val GitHubSearchResultsWrites = Json.writes[GitHubSearchResults]
}