require([
	'ramda',
	'jquery'
],

function(_, $) {

  'use strict';

  var load = function(el) {
    var module = el.dataset.module;

    require([module], (m) => m(el));
  };

  $(() => _.map(load, $('[data-module]').toArray()));

});