/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon'
],

function(React, Icon) {

  'use strict';

  return React.createClass({
    render: function() {
      return null;
      return (
        <ul className="repo-branches">
          <li className="repo-branch row">
            <span className="repo-branch-name cell">
              <Icon type="git-branch" />
              <a href="#" title="View apucacao/albatross at master on Github">master</a>
            </span>
            <span className="repo-follow-status cell">
              <button className="btn btn-tiny"><Icon type="eye" /> Follow branch</button>
            </span>
          </li>
          <li className="repo-branch row">
            <span className="repo-branch-name cell">
              <Icon type="git-branch" />
              <a href="#" title="View apucacao/albatross at 1.2.1 on Github">1.2.1</a>
            </span>
            <span className="repo-follow-status cell">
              <button className="btn btn-tiny"><Icon type="eye" /> Follow branch</button>
            </span>
          </li>
          <li className="repo-branch row">
            <span className="repo-branch-name cell">
              <Icon type="git-branch" />
              <a href="#" title="View apucacao/albatross at dev on Github">dev</a>
            </span>
            <span className="repo-follow-status cell">
              <button className="btn btn-tiny"><Icon type="eye" /> Follow branch</button>
            </span>
          </li>
          <li className="repo-branch row">
            <span className="repo-branch-name cell">
              <Icon type="git-branch" />
              <a href="#" title="View apucacao/albatross at 2.0.x on Github">2.0.x</a>
            </span>
            <span className="repo-follow-status cell">
              <button className="btn btn-tiny"><Icon type="eye" /> Follow branch</button>
            </span>
          </li>
        </ul>
      );
    }
  });

});