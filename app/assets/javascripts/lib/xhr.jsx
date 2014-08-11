define([
  'ramda'
],

function(_, querystring) {

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

      _.mapObj.idx((value, name) => req.setRequestHeader(name, value), headers);

      req.send(method === 'GET' ? '' : data);
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
    },

    delete: function(headers, url) {
      return request('DELETE', headers, url);
    }
  };

});