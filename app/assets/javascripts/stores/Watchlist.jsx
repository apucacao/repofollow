define([
  'ramda',
  'lib/xhr',
],

function(_, xhr) {

  return function(initial) {
    var data = initial;

    return {
      list: () => data,

      add: xhr.post(jsRoutes.controllers.Api.addToWatchlist().url),

      remove: (repo) => xhr.delete(jsRoutes.controllers.Api.removeFromWatchlist(repo.id).url),

      isWatching: function(repo) {
        return _.any((r) => r.id === repo.id, data);
      }
    };
  };

});