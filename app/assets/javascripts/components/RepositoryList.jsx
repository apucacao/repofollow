/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Repository'
],

function(_, React, Repository) {

  'use strict';

  return React.createClass({
    render: function() {
      var groups = _.groupBy(this.props.store.isWatching)(this.props.items);
      var children = _.map((repo) => Repository(_.mixin({key: repo.id, store: this.props.store}, repo)));

      return (
        <div className="repos">
          {children(groups[true] || [])}
          {children(groups[false] || [])}
        </div>
      );
    }
  })

});