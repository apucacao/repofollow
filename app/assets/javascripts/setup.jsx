/** @jsx React.DOM */

define([
  'Bacon',
  'react-with-addons',
  'components/SearchForm',
  'components/SearchResults'
],

function(Bacon, React, SearchForm, SearchResults) {

  'use strict';

  var Setup = React.createClass({
    render: function() {
      return (<div className="setup">
        <SearchForm />
        <SearchResults />
      </div>);
    }
  });

  return (el) => React.renderComponent(<Setup />, el);

});