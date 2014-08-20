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

  var UserRepository = React.createClass({
    mixins: [BaconMixin],

    getInitialState: function() {
      return {
        remove: false,
        updating: false,
        shouldUpdate: false,
        updatedBranchList: this.props.branches
      };
    },

    componentWillMount: function() {
      var select = this.eventStream('branchSelected');

      var remove = this.eventStream('remove');
      var removeResult = remove.flatMapLatest(_.compose(Bacon.fromPromise, Watchlist.remove(this.props)));

      var update = this.eventStream('update');
      var updateResult = update.map(() => _.mixin(this.props, { branches: this.state.updatedBranchList }))
                               .flatMapLatest(_.compose(Bacon.fromPromise, Watchlist.put));

      var differs = _.compose(_.not(_.isEmpty), _.differenceWith((a,b) => a.sha === b.sha, this.props.branches));

      this.plug(select.map(differs).map(true).merge(updateResult.map(false)), 'shouldUpdate');
      this.plug(select, 'updatedBranchList');
      this.plug(remove.awaiting(removeResult), 'remove');
      this.plug(update.awaiting(updateResult), 'updating');
    },

    render: function() {
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
              <Button onClick={this.remove} icon="eye" polarity="negative" disabled={this.state.remove}>Unfollow</Button>
              {this.state.shouldUpdate ? <Button onClick={this.update} icon="eye" disabled={this.state.updating}>Update</Button> : null}
            </div>
          </div>

          {this.props.branches.length ? <BranchList repo={this.props} branches={this.props.branches} onSelection={this.branchSelected} /> : null}
        </div>
      );
    }
  });

  return UserRepository;

});