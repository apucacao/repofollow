/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Icon',
  'components/Repository',
  'components/mixins/StreamReactor'
],

function(_, React, Icon, Repository, StreamReactor) {

  'use strict';

  return React.createClass({
    mixins: [StreamReactor],

    render: function() {
      var repos = _.map((repo) => Repository(_.mixin({key: repo.id, store: this.props.store}, repo)));

      return _.isAtom(this.state) ? (
        <section className="search-results">
          <header>
            <h3>Found {this.state.total_count} repositor{this.state.total_count !== 1 ? 'ies' : 'y'} on GitHub</h3>
          </header>
          <div className="repos">
            {repos(this.state.items)}
          </div>
        </section>
      ) : null;
    }
  });

});