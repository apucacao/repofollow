/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon',
  'components/Button'
],

function(React, Icon, Button) {

  'use strict';

  var Branch = React.createClass({
    propTypes: {
      sha: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      repo: React.PropTypes.object.isRequired,
      onChange: React.PropTypes.func.isRequired,
      preSelected: React.PropTypes.bool
    },

    handleChange: function(event) {
      this.props.onChange(event.target.checked);
    },

  	render: function() {
  		return (
  			<li className="repo-branch">
          <input type="checkbox" name="branches" value={this.props.sha} defaultChecked={this.props.preSelected} onChange={this.handleChange} />
          <span className="repo-branch-name">
            <Icon type="git-branch" />
            <a href={`http://github.com/${this.props.repo.owner.login}/${this.props.repo.name}/commits/${this.props.sha}`} title={`View ${this.props.repo.owner.login}/${this.props.repo.name} at ${this.props.name} on Github`}>{this.props.name}</a>
          </span>
        </li>
  		);
  	}
  });

  return Branch;

});