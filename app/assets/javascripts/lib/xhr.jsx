define([
  'ramda'
],

function(_, querystring) {

  var defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  var request = function(method, headers, url, data) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();

      req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
          resolve(JSON.parse(this.response));
        }
      };

      req.onerror = reject;

      req.open(method, url, true);

      _.mapObj.idx((value, name) => req.setRequestHeader(name, value), _.mixin({}, defaultHeaders, headers));

      data ? req.send(data) : req.send();
    });
  };

  var querystringify = (obj) =>
    _.join('&')(_.zipWith((k,v) => k + '=' + encodeURIComponent(v), _.keys(obj), _.values(obj)));

  return {
    get: function(headers, url, data) {
      return request('GET', headers, data ? url + '?' + querystringify(data) : url);
    },

    post: function(headers, url, data) {
      return request('POST', headers, url, JSON.stringify(data));
    }
  };

});