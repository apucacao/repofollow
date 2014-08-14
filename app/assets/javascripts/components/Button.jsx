/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon'
],

function(React, Icon) {

  'use strict';

  return React.createClass({
    propTypes: {
      onClick: React.PropTypes.func,
      positive: React.PropTypes.bool,
      icon: React.PropTypes.string
    },

    render: function() {
      var classes = React.addons.classSet({
        'btn': true,
        'btn-positive': this.props.positive
      });

      var icon = this.props.icon ? <Icon type={this.props.icon} /> : null;

      return <button className={classes} onClick={this.props.onClick}>{icon} {this.props.children}</button>;
    }
  })

});