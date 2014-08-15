/** @jsx React.DOM */

define([
  'react-with-addons'
],

function(React) {

  'use strict';

  var Icon = React.createClass({
    propTypes: {
      type: React.PropTypes.string.isRequired
    },

    render: function() {
      return <span className={`octicon octicon-${this.props.type}`} />;
    }
  });

  return Icon;

});