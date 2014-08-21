/** @jsx React.DOM */

define([
  'react-with-addons',
  'lib/xhr',
  'components/mixins/SetInterval'
],

function(React, xhr, SetIntervalMixin) {

  var UnseenBadge = React.createClass({
    mixins: [SetIntervalMixin],

    getInitialState: function() {
      return { count: 0 };
    },

    componentDidMount: function() {
      this.setInterval(this.checkUnseenCount, 5000);
    },

    checkUnseenCount: function() {
      var request = xhr.get(jsRoutes.controllers.Api.unseen().url, {});
      request.then((resp) => resp && this.setState(resp));
    },

    render: function() {
      if (this.state.count > 0) {
        return <span className="badge">{this.state.count > 10 ? '10+' : this.state.count}</span>;
      } else {
        return null;
      }
    }
  });

  return UnseenBadge;

});