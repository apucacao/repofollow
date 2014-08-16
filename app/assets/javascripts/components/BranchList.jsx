/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Branch',
  'components/mixins/Bacon'
],

function(_, React, Branch, BaconMixin) {

  'use strict';

  var BranchList = React.createClass({
    mixins: [BaconMixin],

    propTypes: {
      branches: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
      onSelection: React.PropTypes.func.isRequired
    },

    componentWillMount: function() {
      var changes = this.eventStream('changed').map((ie) => ({ branch: this.props.branches[ie[0]], selected: ie[1] }));
      var selection = changes.scan([], function(st, change) {
        if (change.selected) {
          return _.append(change.branch, st);
        } else {
          return _.filter((b) => b.sha !== change.branch.sha, st);
        }
      });

      selection.skip(1).onValue(this.props.onSelection);
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
          onChange: (e) => this.changed([i, e])
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