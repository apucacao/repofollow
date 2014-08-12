/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon',
  'components/Button',
  'components/BranchList'
],

function(React, Icon, Button, BranchList) {

  'use strict';

  return React.createClass({
    handleClick: function(event) {
      var repo = {
        id: this.props.id,
        name: this.props.name,
        owner: this.props.owner,
        description: this.props.description,
        branches: [] // todo
      };

      this.props.store[this.props.store.isWatching(this.props) ? 'remove' : 'add'](repo);
    },

    render: function() {
      var alreadyWatching = this.props.store.isWatching(this.props);

      return (
        <div className="repo">
          <div className="row">
            <div className="repo-title cell">
              <Icon type="repo" />
              <a href={`http://github.com/${this.props.owner.login}/${this.props.name}`} title={`View ${this.props.owner.login}/${this.props.name} on Github`} target="_blank">
                <span className="repo-owner">{this.props.owner.login}</span>/<span className="repo-name">{this.props.name}</span>
              </a>{' '}{this.props.id}
              <div className="repo-description">{this.props.description}</div>
            </div>
            <div className="repo-follow-status cell">
              <Button onClick={this.handleClick} icon="eye" positive={alreadyWatching}>{alreadyWatching ? 'Unfollow' : 'Follow'}</Button>
            </div>
          </div>

          <BranchList repo={this.props} />
        </div>
      );
    }
  });
});