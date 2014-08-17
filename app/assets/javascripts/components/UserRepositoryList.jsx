/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/UserRepository'
],

function(_, React, UserRepository) {

  'use strict';

  var UserRepositoryList = React.createClass({
    propTypes: {
      items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
      var repos = _.map((repo) => UserRepository(_.mixin({ key: repo.id }, repo)));

      return (
        <div className="repos">
          {repos(this.props.items)}
        </div>
      );
    }
  });

  return UserRepositoryList;

});