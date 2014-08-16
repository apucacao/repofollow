/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/SearchRepository'
],

function(_, React, SearchRepository) {

  'use strict';

  var RepositoryList = React.createClass({
    propTypes: {
      items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
      var repos = _.map((repo) => SearchRepository(_.mixin({ key: repo.id }, repo)));

      return (
        <div className="repos">
          {repos(this.props.items)}
        </div>
      );
    }
  });

  return RepositoryList;

});