name := """repofollow"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

resolvers += Resolver.sonatypeRepo("snapshots")

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws,
  "com.github.nscala-time" %% "nscala-time" % "1.2.0",
  "org.reactivemongo" %% "play2-reactivemongo" % "0.10.5.akka23-SNAPSHOT",
  "ws.securesocial" %% "securesocial" % "master-SNAPSHOT",
  "org.webjars" %% "webjars-play" % "2.3.0",
  "org.webjars" % "octicons" % "2.0.1"
)

includeFilter in (Assets, LessKeys.less) := "main.less"

TwirlKeys.templateImports += "org.albatross.repofollow.models._"