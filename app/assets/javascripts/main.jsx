/** @jsx React.DOM */

require([
	'ramda',
	'jquery',
	'react-with-addons'
],

function(_, $, React) {

  'use strict';

  var componentKey = 'component';

  var load = function(el) {
    var dataset = $(el).data();
    var component = dataset.component.trim();

    if (_.isEmpty(component)) { return; }

    require([`components/${component}`], function(Component) {
    	React.renderComponent(Component(), el);
    });
  };

  $(function() {
    var $components = $(`[data-${componentKey}]`);

    // special module that exposes bootstrap data from the server
    define('bootstrap', function() {
      var bootstrap = {};

      $components.each(function(i, el) {
        var dataset = $(el).data();
        $.each(dataset, function(key, value) {
          if (key != componentKey) {
            bootstrap[key] = value;
          }
        });
      });

      return bootstrap;
    });

  	return _.map(load, $components.toArray());
  });

});