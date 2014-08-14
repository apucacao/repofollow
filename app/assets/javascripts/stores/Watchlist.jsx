define([
  'ramda',
  'lib/xhr',
  'Bacon',
  'bootstrap'
],

function(_, xhr, Bacon, bootstrap) {

  return {
    get: function() {
      return bootstrap.watchlist
    },

    put: function(repo) {
      return xhr.put(jsRoutes.controllers.Api.updateWatchlistItem(repo.id).url, repo);
    },

    remove: function(repo) {
      xhr.delete(jsRoutes.controllers.Api.removeWatchlistItem(repo.id).url);
    },

    isWatchingRepo: function(repo) {
      return _.any((r) => r.id === repo.id, this.get().repos);
    },

    isWatchingBranch: function(repo, branch) {
      var watched = _.find((r) => r.id === repo.id, this.get().repos);
      return watched && _.any((b) => b.sha === branch.sha, watched.branches);
    }
  };

});