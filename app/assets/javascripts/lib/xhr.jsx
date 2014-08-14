define([
  'ramda',
  'jquery'
],

function(_, $) {

  var mimetype = 'application/json';

  var getJSON = function(url, data) {
    return $.ajax({ type: 'GET', url: url, data: data, dataType: 'json' });
  }

  var putJSON =  function(url, data) {
    return $.ajax({ type: 'PUT', url: url, data: JSON.stringify(data), dataType: 'json', processData: false, contentType: mimetype });
  };

  var del = function(url) {
    return $.ajax({ type: 'DELETE', url: url });
  };

  return {
    get: _.curry(getJSON),
    put: _.curry(putJSON),
    'delete': del
  };

});