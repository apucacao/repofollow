require(['ramda', 'requirejs-domready'], function(_, domReady) {

  'use strict';

  var load = (el) => {
    var module = el.dataset.module;
    require([module], (m) => m(el));
  }

  var startup = () => _.map(load, document.querySelectorAll('[data-module]'));

  domReady(startup);

});