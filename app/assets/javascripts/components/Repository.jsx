/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon',
  'components/Button',
  'components/Branches'
],

function(React, Icon, Button, Branches) {

  'use strict';

  return React.createClass({
    handleClick: function(event) {
      var repo = {
        id: this.props.id,
        name: this.props.name,
        owner: this.props.owner.login,
        description: this.props.description,
        branches: [] // todo
      };

      this.props.store.add(repo);
    },

    render: function() {
      var alreadyWatching = this.props.store.isWatching(this.props);

      if (alreadyWatching) {
        console.log('already watching', this.props.full_name);
      }

      return (
        <div className="repo">
          <div className="row">
            <div className="repo-title cell">
              <Icon type="repo" />
              <a href={this.props.html_url} title={`View ${this.props.full_name} on Github`} target="_blank">
                <span className="repo-owner">{this.props.owner.login}</span>/<span className="repo-name">{this.props.name}</span>
              </a>
              <div className="repo-description">{this.props.description}</div>
            </div>
            <div className="repo-follow-status cell">
              <Button onClick={this.handleClick} icon="eye" positive={alreadyWatching}>{alreadyWatching ? 'Unfollow' : 'Follow'}</Button>
            </div>
          </div>

          <Branches />
        </div>
      );
    }
  });
// <button className="btn" onClick={this.handleClick}><Icon type="eye" /> {alreadyWatching ? 'Unfollow' : 'Follow'}</button>
});