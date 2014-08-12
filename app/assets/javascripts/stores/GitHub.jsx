define([
	'ramda',
  'lib/xhr'
],

function(_, xhr) {

  return {
    searchRepositoriesWithBranches: xhr.get(jsRoutes.controllers.GitHubProxy.searchRepositories().url)
  };

});