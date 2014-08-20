/** @jsx React.DOM */

define([
  'react-with-addons',
  'stores/Watchlist',
  'components/UserRepositoryList',
  'components/mixins/Bacon'
],

function(React, Watchlist, UserRepositoryList, BaconMixin) {

  'use strict';

  var Settings = React.createClass({
    mixins: [BaconMixin],

    getInitialState: function() {
      return { watchlist: Watchlist.get() };
    },

    componentDidMount: function() {
      this.plug(Watchlist.modified, 'watchlist');
    },

    render: function() {
      var repoCount = this.state.watchlist.repos.length;

      if (repoCount === 0) {
        return <p>You're not following any repositories. <a href="/setup" title="Setup">Find some on GitHub →</a></p>;
      } else {
        return (
          <div>
            <p>You’re following {repoCount} repositor{repoCount !== 1 ? 'ies' : 'y'}.</p>
            {repoCount > 0 ? <UserRepositoryList items={this.state.watchlist.repos} /> : null}
          </div>
        );
      }
    }
  });

  return Settings;

});