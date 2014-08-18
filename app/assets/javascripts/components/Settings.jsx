/** @jsx React.DOM */

define([
  'react-with-addons',
  'stores/Watchlist',
  'components/UserRepositoryList'
],

function(React, Watchlist, UserRepositoryList) {

  'use strict';

  var Settings = React.createClass({
    getInitialState: function() {
      return { watchlist: Watchlist.get() };
    },

    render: function() {
      var repoCount = this.state.watchlist.repos.length;

      return (
        <div>
          <p>You’re following {repoCount} repositor{repoCount !== 1 ? 'ies' : 'y'}.</p>
          {repoCount > 0 ? <UserRepositoryList items={this.state.watchlist.repos} /> : null}
        </div>
      );
    }
  });

  return Settings;

});