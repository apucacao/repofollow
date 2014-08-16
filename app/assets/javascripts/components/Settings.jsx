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
      var repoCount = this.state.watchlist.repos.length;

      return (
        <div>
          <p>You're following {repoCount} repositor{repoCount !== 1 ? 'ies' : 'y'}.</p>
          <RepositoryList items={this.state.watchlist.repos} />
        </div>
      );
    }
  });

  return Settings;

});