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
              <Icon icon="repo" />
              <a href="#" title="View apucacao/albatross on Github">
                <span className="repo-owner">apucacao</span>/<span className="repo-name">albatross</span>
              </a>
              <div className="repo-description">A simple bookmarking app meant to be used by small groups.</div>
            </div>
            <div className="repo-follow-status cell">
              <button className="btn"><Icon icon="eye" /> Follow</button>
            </div>
          </div>

          <Branches />
        </div>
      );
    }
  });

});