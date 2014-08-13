/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon',
  'components/Button'
],

function(React, Icon, Button) {

  'use strict';

  return React.createClass({
  	render: function() {
  		return (
  			<li className="repo-branch">
          <input type="checkbox" />
          <span className="repo-branch-name">
            <Icon type="git-branch" />
            <a href={`http://github.com/${this.props.repo.owner.login}/${this.props.repo.name}/commits/${this.props.sha}`} title={`View ${this.props.repo.owner.login}/${this.props.repo.name} at ${this.props.name} on Github`}>{this.props.name}</a>
          </span>
        </li>
  		);
  	}
  });

});