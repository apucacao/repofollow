/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Branch'
],

function(_, React, Branch) {

  'use strict';

  return React.createClass({
    propTypes: {
      branches: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    handleChange: function(event) {
      this.props.onChange({ sha: event.target.value, selected: event.target.checked });
    },

    render: function() {
      var order = function(a, b) {
        if (a.name === 'master' || b.name === 'master') {
          return a.name === 'master' ? -1 : 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      };

      var branches = _.compose(_.map((branch) => Branch(_.mixin({ key: branch.sha, repo: this.props.repo }, branch))),
                               _.sort(order));
      return (
        <div className="repo-branches">
          {branches(this.props.branches)}
        </div>
      );
    }
  });

});