/** @jsx React.DOM */

define([
  'react-with-addons'
],

function(React) {

  'use strict';

  return React.createClass({
    propTypes: {
      icon: React.PropTypes.string.isRequired
    },

    render: function() {
      return <span className={`octicon octicon-${this.props.icon}`} />;
    }
  })

});