define([
  'Bacon'
],

function(Bacon) {

  return {
    componentWillMount: function() {
      this.props.stream.onValue(this.setState.bind(this));
    }
  };

});