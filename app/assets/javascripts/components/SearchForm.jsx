/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon'
],

function(React, Icon) {

  'use strict';

  return React.createClass({
    handleSubmit: function(event) {
      var value = (this.refs.q.state.value || '').trim();

      if (value) {
        this.setState({ q: value }, () => this.props.stream.push(this.state));
      }
      
      event.preventDefault();
    },

    render: function() {
      return (
        <form className="search-form row" onSubmit={this.handleSubmit}>
          <input type="search" ref="q" placeholder="eg. jquery" autoFocus/>
          <button type="submit" className="btn"><Icon type="search" /> Search</button>
        </form>
      );
    }
  });

});