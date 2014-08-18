/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Branch',
  'stores/Watchlist'
],

function(_, React, Branch, Watchlist) {

  'use strict';

  var BranchList = React.createClass({
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
      var renderBranch = (branch, i) =>
        Branch(_.mixin({
          key: branch.sha,
          repo: this.props.repo,
          preSelected: !!_.find((b) => b.sha === branch.sha, this.state.selectedBranches),
          onChange: this.handleChange.bind(this, i)
      }, branch));

      var branches = _.map.idx(renderBranch);

      return (
        <div className="repo-branches">
          {branches(this.props.branches)}
        </div>
      );
    }
  });

  return BranchList;

});