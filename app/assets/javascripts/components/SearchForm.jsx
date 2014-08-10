/** @jsx React.DOM */

define([
  'react-with-addons'
],

function(React) {

  'use strict';

  return React.createClass({
    render: function() {
      return (
        <form className="search-form row">
          <input type="search" name="q" placeholder="eg. jquery" autofocus />
          <button type="submit" className="btn"><span className="octicon octicon-search"></span> Search</button>
        </form>
      );
    }
  });

});