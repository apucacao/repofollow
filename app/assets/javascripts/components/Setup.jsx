/** @jsx React.DOM */

define([
  'ramda',
  'Bacon',
  'react-with-addons',
  'stores/Watchlist',
  'components/SearchForm',
  'components/SearchResults'
],

function(_, Bacon, React, Watchlist, SearchForm, SearchResults) {

  'use strict';

  return React.createClass({
    getInitialState: function() {
      return { q : '' };
    },

    onSearch: function(q) {
      this.setState({ q : q });
    },

    render: function() {
      return (
        <div>
          <SearchForm handleSearch={this.onSearch} />
          <SearchResults q={this.state.q} />
        </div>
      );
    }
  });

});