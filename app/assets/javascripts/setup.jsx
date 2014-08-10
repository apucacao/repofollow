/** @jsx React.DOM */

define([
  'ramda',
  'Bacon',
  'react-with-addons',
  'lib/GitHub',
  'components/SearchForm',
  'components/SearchResults',
  'components/Spinner'
],

function(_, Bacon, React, GitHub, SearchForm, SearchResults, Spinner) {

  'use strict';

  return (el) => {
    var term = new Bacon.Bus();
    var results = term.flatMapLatest(_.compose(Bacon.fromPromise, GitHub.search));
    var requesting = term.map(true).merge(results.map(false).mapError(false)).skipDuplicates().toProperty(false).map((s) => ({ visible: s }));

    React.renderComponent(
      <div>
        <SearchForm stream={term} />
        <Spinner stream={requesting} />
        <SearchResults stream={results} />
      </div>
    , el);
  }

});