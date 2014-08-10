/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon',
  'components/Repository'
],

function(React, Icon, Repository) {

  'use strict';

  return React.createClass({
    render: function() {
      return (
        <section className="search-results">
          <header><h3>Found 4 repositories on GitHub</h3></header>
          <div className="repos">
            <Repository />
            <Repository />
          </div>
        </section>
      );
    }
  });

});