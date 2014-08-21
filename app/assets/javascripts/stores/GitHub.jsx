define([
  'ramda',
  'lib/xhr'
],

function(_, xhr) {

  return {
    searchRepositoriesWithBranches: function(q) {
      return xhr.get(jsRoutes.controllers.GitHubProxy.searchRepositories().url, {q : q });
    }
  };

});