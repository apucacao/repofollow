define([
  'ramda',
  'lib/xhr'
],

function(_, xhr) {

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return function(initial) {
    var data = initial;

    return {
      add: _.lPartial(xhr.post, headers, jsRoutes.controllers.Api.addToWatchlist().url),

      isWatching: function(repo) {
        return _.any((r) => r.id === repo.id, data);
      }
    };
  };

});