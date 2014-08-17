/** @jsx React.DOM */

define([
  'react-with-addons',
  'components/Icon',
  'components/mixins/Bacon'
],

function(React, Icon, BaconMixin) {

  'use strict';

  var SearchForm = React.createClass({
    mixins: [BaconMixin],

    propTypes: {
      handleSearch: React.PropTypes.func.isRequired
    },

    componentWillMount: function() {
      this.eventStream('formSubmit')
          .map('.preventDefault')
          .map(() => (this.refs.q.state.value || '').trim())
          .onValue(this.props.handleSearch);
    },

    render: function() {
      return (
        <form className="search-form row" onSubmit={this.formSubmit}>
          <input type="search" ref="q" placeholder="eg. jquery" autoFocus defaultValue={this.props.q} />
          <button type="submit" className="btn"><Icon type="search" /> Search</button>
        </form>
      );
    }
  });

  return SearchForm;

});