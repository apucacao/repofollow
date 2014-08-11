/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Icon',
  'components/RepositoryList',
  'components/mixins/StreamReactor'
],

function(_, React, Icon, RepositoryList, StreamReactor) {

  'use strict';

  return React.createClass({
    mixins: [StreamReactor],

    render: function() {
      return _.isAtom(this.state) ? (
        <section className="search-results">
          <header>
            <h3>Found {this.state.total_count} repositor{this.state.total_count !== 1 ? 'ies' : 'y'} on GitHub</h3>
          </header>
          <RepositoryList items={this.state.items} store={this.props.store} />
        </section>
      ) : null;
    }
  });

});