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

  var extractRepository = function(repo) {
    return {
      id: repo.id,
      name: repo.name,
      owner: { login: repo.owner.login },
      description: repo.description
    };
  };

  var extractBranch = function(branch) {
    return {
      sha: branch.commit.sha,
      name: branch.name
    };
  };

  var getRepositoryBranches = function(fullName) {
    return xhr.get(headers, path(`/repos/${fullName}/branches`)).then((branches) => _.map(extractBranch, branches));
  };

  var withBranches = function(repo) {
    return getRepositoryBranches(`${repo.owner.login}/${repo.name}`).then(function(branches) {
      return _.mixin(repo, { branches: branches });
    });
  };

  // searchRepositories: _.lPartial(xhr.get, headers, path('/search/repositories'))
  var searchRepositories = function(params) {
    var search = xhr.get(headers, path('/search/repositories'), params);
    return search.then(function(results) {
      return _.mixin(results, { items: _.map(extractRepository, results.items) });
    });
  }

  return {
    searchRepositoriesWithBranches: function(q) {
      return searchRepositories(q).then(function(results) {
        var reposWithBranches = _.map(withBranches, results.items);
        return Promise.all(reposWithBranches).then(function(repos) { return _.mixin(results, { items: repos }); });
      });
    }
  };

});