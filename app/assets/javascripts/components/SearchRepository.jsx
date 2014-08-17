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

  var SearchRepository = React.createClass({
    mixins: [BaconMixin],

    getInitialState: function() {
      return {
        saving: false,
        selectedBranches: []
      };
    },

    componentWillMount: function() {
      var click = this.eventStream('buttonClicked');
      var select = this.eventStream('branchSelected');
      var result = click.map(() => _.mixin(this.props, { branches: this.state.selectedBranches }))
                        .flatMapLatest(_.compose(Bacon.fromPromise, Watchlist.put));

      this.plug(select, 'selectedBranches');
      this.plug(click.awaiting(result), 'saving');
    },

    render: function() {
      var label = () => {
        var size = this.state.selectedBranches.length;
        return (size > 0) ? `Follow branch${size !== 1 ? 'es' : ''}` : 'Follow';
      };

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
              <Button icon="eye" onClick={this.buttonClicked} disabled={this.state.saving}>{label()}</Button>
            </div>
          </div>

          {this.props.branches.length ? <BranchList repo={this.props} branches={this.props.branches} onSelection={this.branchSelected} /> : null}
        </div>
      );
    }
  });

  return SearchRepository;

});