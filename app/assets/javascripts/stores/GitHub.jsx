define([
  'ramda',
  'lib/xhr'
],

function(_, xhr) {

  var api = 'https://api.github.com';

  var headers = {
    'Accept': 'application/vnd.github.v3+json'
  };

  var path = function(path) {
    return api + path;
  };

  return {
    search: _.lPartial(xhr.get, headers, path('/search/repositories'))
  };

});