define([
  'ramda',
  'lib/xhr'
],

function(_, xhr) {

  return {
    searchRepositoriesWithBranches: _.lPartial(xhr.get, {}, jsRoutes.controllers.GitHubProxy.searchRepositories().url)
  };

});