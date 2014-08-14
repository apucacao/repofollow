/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Repository'
],

function(_, React, Repository) {

  'use strict';

  return React.createClass({
    propTypes: {
      items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
      var repos = _.compose(_.map((repo) => Repository(_.mixin({ key: repo.id }, repo))),
                            _.filter((repo) => repo.branches.length > 0));

      return (
        <div className="repos">
          {repos(this.props.items)}
        </div>
      );
    }
  })

});