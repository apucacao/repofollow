/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Branch'
],

function(_, React, Branch) {

  'use strict';

  return React.createClass({
    render: function() {
      var children = _.map((branch) => Branch(_.mixin({key: branch.sha, repo: this.props.repo}, branch)));

      return (
        <ul className="repo-branches">
          {children(this.props.repo.branches)}
        </ul>
      );
    }
  });

});