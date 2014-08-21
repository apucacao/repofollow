import scalaz._, Scalaz._

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import play.api._
import play.api.mvc._

package object controllers {

  case class Stop(result: Result) extends Throwable

  implicit class OptionOps[A](oa: Option[A]) {
    def orStopWith(r: Result): Future[A] =
      oa.cata(some = Future.successful, none = Future.failed(Stop(r)))
  }

  implicit class FutureOptionOps[A](foa: Future[Option[A]]) {
    def orStopWith(r: Result): Future[A] =
      foa.flatMap(_.orStopWith(r))
  }

}