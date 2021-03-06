# RepoFollow

## Getting started

I assume you're running on a Mac.

1. install [Homebrew](http://brew.sh/) if you don't have it yet

1. install Scala
`brew install scala`

1. install the [Typesafe Activator](https://typesafe.com/activator) to run the app
`brew install typesafe-activator`

1. install MongoDB
`brew install mongo`

1. start the app
`activator run`

## Notes

- The app sends conditional requests the GitHub API to avoid hitting the relatively low rate limits (5000/hour for the commit API)
- The app polls GitHub every 5 minutes and caches commits to MongoDB. With a large number of users and repositories, requesting the latest commits from GitHub would be slow and the user experience would be terrible. To notify the user that there are new commits, a little badge pops up over the home icon with a count of new commits. The idea was taken from Tumblr.
- Upon login, the app forces a fetch of latest commits in the background

## Some improvements

- Error handling
- The search page UX needs some polish especially when working with repositories that are already being followed
- Add the ability to go back in time and let user see commits from before they started following a repository or branch
- GitHub provides webhooks which could be used to cut down the time to the latest commit(s) (currently 5 mins.)
- The current schema is mostly denormalized. This means that as more users
join and more commits are cached, storage requirements will go up. Explore ways to reduce duplication
- There are some very rough edges in the code at the moment, especially in the front end component code -- clean that up :)

## Additional features

- It would be nice to be able to follow users
- Beyond the repository description, there is little information about a repository. It would be nice to have an additional view to see more info about a repository. We could pull in the README if it is available for example.
- It would be nice to filter commits by repository and branch
- It would be nice to have the ability to dig into the context of a commit. This can be done on GitHub, but a quick view of related commits might be interesting
- It would be nice to have a little chart to visualize the kind of repositories a user is following, to gain insight into what languages they are interested in
