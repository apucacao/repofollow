/** @jsx React.DOM */

define([
  'react-with-addons'
],

function(React) {

  var SetIntervalMixin = {
    componentWillMount: function() {
      this.intervals = [];
    },

    setInterval: function() {
      this.intervals.push(setInterval.apply(null, arguments));
    },

    componentWillUnmount: function() {
      this.intervals.map(clearInterval);
    }
  };

  return SetIntervalMixin;

});