name := """repofollow"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

resolvers += Resolver.sonatypeRepo("snapshots")

resolvers += "Local Maven Repository" at "file://"+Path.userHome.absolutePath+"/.m2/repository"

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws,
  "org.scalaz" %% "scalaz-core" % "7.1.0",
  "com.github.nscala-time" %% "nscala-time" % "1.2.0",
  "org.reactivemongo" %% "play2-reactivemongo" % "0.10.5.akka23-SNAPSHOT",
  "ws.securesocial" %% "securesocial" % "master-SNAPSHOT",
  "org.webjars" %% "webjars-play" % "2.3.0",
  "org.webjars" % "octicons" % "2.0.1"
)

includeFilter in (Assets, LessKeys.less) := "main.less"

TwirlKeys.templateImports += "org.albatross.repofollow.models._"

initialCommands := """
    import scalaz._, Scalaz._
    import org.albatross.repofollow.models._
    import org.albatross.repofollow.db._
    import com.github.nscala_time.time.Imports._
    import scala.concurrent.ExecutionContext.Implicits.global
    import play.api._
    import play.api.mvc._
    import play.api.libs.json._
    import play.core.StaticApplication
    import play.api.Play.current
    import play.modules.reactivemongo._
    val app = new StaticApplication(new java.io.File("."))
    val db = ReactiveMongoPlugin.db
"""