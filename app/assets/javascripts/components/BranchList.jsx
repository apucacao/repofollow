/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Branch',
  'components/mixins/Bacon',
  'stores/Watchlist'
],

function(_, React, Branch, BaconMixin, Watchlist) {

  'use strict';

  var BranchList = React.createClass({
    mixins: [BaconMixin],

    propTypes: {
      branches: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
      onSelection: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
      return {
        selectedBranches: _.filter((b) => Watchlist.isWatchingBranch(this.props.repo, b), this.props.branches)
      };
    },

    handleChange: function(i, selected) {
      var branch = this.props.branches[i];
      var newSelection = selected ? _.append(branch, this.state.selectedBranches) : _.filter((b) => b.sha !== branch.sha, this.state.selectedBranches);
      this.setState({ selectedBranches: newSelection }, () => this.props.onSelection(this.state.selectedBranches));
    },

    render: function() {
      var order = function(a, b) {
        if (a.name === 'master' || b.name === 'master') {
          return a.name === 'master' ? -1 : 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      };

      var renderBranch = (branch, i) =>
        Branch(_.mixin({
          key: branch.sha,
          repo: this.props.repo,
          preSelected: !!_.find((b) => b.sha === branch.sha, this.state.selectedBranches),
          onChange: this.handleChange.bind(this, i)
      }, branch));

      var branches = _.compose(_.map.idx(renderBranch), _.sort(order));

      return (
        <div className="repo-branches">
          {branches(this.props.branches)}
        </div>
      );
    }
  });

  return BranchList;

});