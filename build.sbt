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
  "org.typelevel" %% "scalaz-nscala-time" % "0.2",
  "com.github.nscala-time" %% "nscala-time" % "1.2.0",
  "org.reactivemongo" %% "play2-reactivemongo" % "0.10.5.akka23-SNAPSHOT",
  "ws.securesocial" %% "securesocial" % "master-SNAPSHOT",
  "org.webjars" %% "webjars-play" % "2.3.0",
  "org.webjars" % "octicons" % "2.0.1",
  "org.webjars" % "requirejs" % "2.1.1",
  "org.webjars" % "ramda" % "0.3.0",
  "org.webjars" % "baconjs" % "0.7.18",
  "org.webjars" % "react" % "0.11.1",
  "org.webjars" % "jquery" % "2.1.1",
  "org.webjars" % "momentjs" % "2.8.1-1"
)

includeFilter in (Assets, LessKeys.less) := "main.less"

ReactJsKeys.harmony := true

ReactJsKeys.sourceMapInline := true

TwirlKeys.templateImports ++= Seq("org.albatross.repofollow.models._", "play.api.libs.json.Json")

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