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
      return (
        <div className="repo-branches">
          <form>
          {_.map((branch) => Branch(_.mixin({ key: branch.sha, repo: this.props.repo }, branch)), this.props.branches)}
          </form>
        </div>
      );
    }
  });

});