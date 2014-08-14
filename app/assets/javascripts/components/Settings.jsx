/** @jsx React.DOM */

define([
  'react-with-addons',
  'stores/Watchlist',
  'components/RepositoryList'
],

function(React, Watchlist, RepositoryList) {

  'use strict';

  return React.createClass({
    getInitialState: function() {
      return { watchlist: Watchlist.get() };
    },

    render: function() {
      return <RepositoryList items={this.state.watchlist.repos} />;
    }
  });

});