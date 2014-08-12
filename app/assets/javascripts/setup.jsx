/** @jsx React.DOM */

define([
  'ramda',
  'Bacon',
  'react-with-addons',
  'stores/GitHub',
  'stores/Watchlist',
  'components/SearchForm',
  'components/SearchResults',
  'components/Spinner'
],

function(_, Bacon, React, GitHub, Watchlist, SearchForm, SearchResults, Spinner) {

  'use strict';

  return (el) => {
    var watchlist = new Watchlist(JSON.parse(el.dataset.watchlist));

    var term = new Bacon.Bus();
    var results = term.flatMapLatest(_.compose(Bacon.fromPromise, GitHub.searchRepositoriesWithBranches));
    var requesting = term.map(true).merge(results.map(false).mapError(false)).skipDuplicates().toProperty(false).map((s) => ({ visible: s }));

    React.renderComponent(
      <div>
        <SearchForm stream={term} />
        <Spinner stream={requesting} />
        <SearchResults stream={results} store={watchlist} />
      </div>
    , el);
  }

});