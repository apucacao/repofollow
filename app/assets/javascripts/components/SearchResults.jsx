/** @jsx React.DOM */

define([
  'ramda',
  'stores/GitHub',
  'react-with-addons',
  'components/Icon',
  'components/RepositoryList',
  'components/mixins/Bacon'
],

function(_, GitHub, React, Icon, RepositoryList, BaconMixin) {

  'use strict';

  var notEmpty = _.not(_.isEmpty);

  return React.createClass({
    mixins: [BaconMixin],

    propTypes: {
      q: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
      return { results: [], loading: false };
    },

    componentWillMount: function() {
      var q = this.propsProperty('q');
      var results = q.filter(notEmpty).flatMapLatest(_.compose(Bacon.fromPromise, GitHub.searchRepositoriesWithBranches));

      // TODO: handle errors

      this.plug(results, 'results');
      this.plug(q.awaiting(results), 'loading');
    },

    render: function() {
      if (_.isEmpty(this.props.q)) {
        return <div />;
      } else if (this.state.loading) {
        return <div className="spinner" />;
      }

      return (
        <section className="search-results">
          <header>
            <h3>Found {this.state.results.count} repositor{this.state.results.count !== 1 ? 'ies' : 'y'} on GitHub</h3>
          </header>
          <RepositoryList items={this.state.results.items} />
        </section>
      );
    }
  });

});