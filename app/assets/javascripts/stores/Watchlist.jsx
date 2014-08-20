define([
  'ramda',
  'lib/xhr',
  'Bacon',
  'bootstrap'
],

function(_, xhr, Bacon, bootstrap) {

  var updated = new Bacon.Bus();
  var removed = new Bacon.Bus();
  var modified = updated.merge(removed);

  var data = bootstrap.watchlist;

  return {
    updated: updated,

    removed: removed,

    modified: modified,

    get: function() {
      return data;
    },

    put: function(repo) {
      // return xhr.put(jsRoutes.controllers.Api.updateWatchlistItem(repo.id).url, repo);
      var request = xhr.put(jsRoutes.controllers.Api.updateWatchlistItem(repo.id).url, repo);
      request.then(function(resp) {
        data = resp;
        updated.push(data);
      });
      return request;
    },

    remove: function(repo) {
      return function() {
        // return () => xhr.delete(jsRoutes.controllers.Api.removeWatchlistItem(repo.id).url);
        var request = xhr.delete(jsRoutes.controllers.Api.removeWatchlistItem(repo.id).url);
        request.then(function(resp) {
          data = resp;
          removed.push(data);
        });
        return request;
      };
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