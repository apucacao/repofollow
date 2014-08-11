define([
  'ramda',
  'lib/xhr'
],

function(_, xhr) {

  var headersWithPayload = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  var headersWithoutPayload = {
    'Accept': 'application/json',
  };

  return function(initial) {
    var data = initial;

    return {
      list: () => data,

      add: _.lPartial(xhr.post, headersWithPayload, jsRoutes.controllers.Api.addToWatchlist().url),

      remove: (repo) => xhr.delete(headersWithoutPayload, jsRoutes.controllers.Api.removeFromWatchlist(repo.id).url),

      isWatching: function(repo) {
        return _.any((r) => r.id === repo.id, data);
      }
    };
  };

});