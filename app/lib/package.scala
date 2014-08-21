package org.albatross.repofollow

import scalaz._, Scalaz._

import scala.concurrent.ExecutionContext.Implicits.global

import play.api.mvc._, BodyParsers._, Results.BadRequest
import play.api.libs.json._

package object lib {

  def jsonBody[T: Reads] = new BodyParser[T] {
    def apply(headers: RequestHeader) = parse.json(headers).map { (result: Either[Result, JsValue]) =>
      result.flatMap(json => Json.fromJson[T](json).asEither.left.map { error => BadRequest(JsError.toFlatJson(error)) })
    }
  }

}