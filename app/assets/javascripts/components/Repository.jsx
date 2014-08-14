/** @jsx React.DOM */

define([
  'ramda',
  'react-with-addons',
  'components/Icon',
  'components/Button',
  'components/BranchList',
  'components/mixins/Bacon',
  'stores/Watchlist'
],

function(_, React, Icon, Button, BranchList, BaconMixin, Watchlist) {

  'use strict';

  return React.createClass({
    mixins: [BaconMixin],

    getInitialState: function() {
      return { saving: false };
    },

    componentWillMount: function() {
      var click = this.eventStream('buttonClicked');
      var result = click.flatMapLatest(_.compose(Bacon.fromPromise, _.lPartial(Watchlist.put, this.props)));

      this.plug(click.awaiting(result), 'saving');
    },

    render: function() {
      var watching = Watchlist.isWatchingRepo(this.props);

      return (
        <div className="repo">
          <div className="row">
            <div className="repo-title cell">
              <Icon type="repo" />
              <a href={`http://github.com/${this.props.owner.login}/${this.props.name}`} title={`View ${this.props.owner.login}/${this.props.name} on Github`} target="_blank">
                <span className="repo-owner">{this.props.owner.login}</span>/<span className="repo-name">{this.props.name}</span>
              </a>
              <div className="repo-description">{this.props.description}</div>
            </div>
            <div className="repo-follow-status cell">
              <Button icon="eye" onClick={this.buttonClicked} disabled={this.state.saving}>{watching ? 'Unfollow' :'Follow'}</Button>
            </div>
          </div>

          <BranchList repo={this.props} branches={this.props.branches} />
        </div>
      );
    }
  });
});