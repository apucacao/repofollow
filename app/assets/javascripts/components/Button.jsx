/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon'
],

function(React, Icon) {

  'use strict';

  var Button = React.createClass({
    propTypes: {
      onClick: React.PropTypes.func,
      polarity: React.PropTypes.oneOf(['positive', 'neutral', 'negative']),
      disabled: React.PropTypes.bool,
      size: React.PropTypes.oneOf(['tiny', 'big']),
      icon: React.PropTypes.string
    },

    getDefaultProps: function() {
      return {
        polarity: 'neutral'
      };
    },

    render: function() {
      var classes = React.addons.classSet({
        'btn': true,
        'btn-positive': this.props.polarity === 'positive',
        'btn-negative': this.props.polarity === 'negative',
        'btn-tiny': this.props.size === 'tiny',
        'btn-big': this.props.size === 'big'
      });

      var icon = this.props.icon ? <Icon type={this.props.icon} /> : null;

      return <button className={classes} onClick={this.props.onClick} disabled={this.props.disabled}>{icon} {this.props.children}</button>;
    }
  });

  return Button;

});