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
      return (
        <div className="repos">
          {_.map((repo) => Repository(_.mixin({ key: repo.id }, repo)), this.props.items)}
        </div>
      );
    }
  })

});