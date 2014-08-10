/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon',
  'components/Branches'
],

function(React, Icon, Branches) {

  'use strict';

  return React.createClass({
    render: function() {
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
              <button className="btn"><Icon type="eye" /> Follow</button>
            </div>
          </div>

          <Branches />
        </div>
      );
    }
  });

});