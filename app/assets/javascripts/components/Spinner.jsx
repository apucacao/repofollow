/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/mixins/StreamReactor'
],

function(React, StreamReactor) {

  'use strict';

  return React.createClass({
    mixins: [StreamReactor],

    render: function() {
      return this.state.visible ? <div className="spinner" /> : null;
    }
  });

});