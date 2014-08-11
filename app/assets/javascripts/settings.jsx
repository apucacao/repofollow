/** @jsx React.DOM */

define([
  'react-with-addons',
  'stores/Watchlist',
  'components/RepositoryList'
],

function(React, Watchlist, RepositoryList) {

  'use strict';

  return (el) => {
    var watchlist = new Watchlist(JSON.parse(el.dataset.watchlist));

    React.renderComponent(
      <RepositoryList items={watchlist.list()} store={watchlist} />
    , el);
  }

});