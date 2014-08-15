/** @jsx React.DOM */

define([
  'react-with-addons',
  'stores/Watchlist',
  'components/RepositoryList'
],

function(React, Watchlist, RepositoryList) {

  'use strict';

  var Settings = React.createClass({
    getInitialState: function() {
      return { watchlist: Watchlist.get() };
    },

    render: function() {
      return <RepositoryList items={this.state.watchlist.repos} />;
    }
  });

  return Settings;

});