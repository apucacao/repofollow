/** @jsx React.DOM */

define([
	'ramda',
  'react-with-addons',
  'components/Event',
  'bootstrap'
],

function(_, React, Event, bootstrap) {

	var Stream = React.createClass({
		getInitialState: function() {
			return bootstrap;
		},

		render: function() {
			var events = _.map((e) => Event(_.mixin({ key: e.commit.sha }, e)), this.state.events);

			if (events.length) {
				return (
					<div className="events">
						{events}
					</div>
				);
			} else {
				return <p>Nothing to see yet.</p>;
			}
		}
	});

	return Stream;

});