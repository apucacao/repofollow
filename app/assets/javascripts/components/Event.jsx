/** @jsx React.DOM */

define([
  'react-with-addons',
  'moment'
],

function(React, moment) {

	var Commit = React.createClass({
		render: function() {
			var ago = moment(this.props.commit.date).fromNow();

			return (
				<article className="commit row row-top">
		      <a href={`http://github.com/${this.props.commit.committer.login}`} className="commit-authorship cell"><img src={this.props.commit.committer.avatarUrl} /></a>
		      <div className="commit-details cell">
		        <div>
		          <span className="commit-message">{this.props.commit.message}</span>
		        </div>
		        <div className="commit-meta">
		          <a href={`http://github.com/${this.props.repo.owner}/${this.props.repo.name}/commits/${this.props.commit.sha}`} className="commit-sha"><span className="octicon octicon-git-commit"></span> <code>{this.props.commit.sha.slice(0, 7)}</code></a>
		          {' '}<time dateTime={this.props.commit.date}>{ago}</time>
		          {' '}by{' '}<a href={`http://github.com/${this.props.commit.committer.login}`} className="commit-author">{this.props.commit.committer.login}</a>
		          {' '}to{' '}
		          <a href={`http://github.com/${this.props.repo.owner}/${this.props.repo.name}`} title={`View ${this.props.repo.owner}/${this.props.repo.name} on Github`} target="_blank">
		          	<span className="repo-owner">{this.props.repo.owner}</span>/<span className="repo-name">{this.props.repo.name}</span>{this.props.branch ? `#${this.props.branch.name}` : null}
		          </a>
		        </div>
		      </div>
		    </article>
			);
		}
	});

	return Commit;

});