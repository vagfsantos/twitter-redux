import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";

import { TiArrowBackOutline } from "react-icons/ti/index";
import { TiHeartOutline } from "react-icons/ti/index";
import { TiHeartFullOutline } from "react-icons/ti/index";

import { handleToggleTweet } from "../actions/tweets";

class Tweet extends Component {
  handleLike = event => {
    event.preventDefault();
    const { dispatch, authedUser, tweet } = this.props;

    dispatch(
      handleToggleTweet({ authedUser, id: tweet.id, hasLiked: tweet.hasLiked })
    );
  };

  toParent = event => {
    event.preventDefault();
    this.props.history.push(`/tweet/${this.props.tweet.id}`);
  };

  render() {
    const { tweet } = this.props;

    if (!tweet) {
      return <p>This tweet doesn't exist.</p>;
    }

    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      id,
      parent
    } = tweet;

    return (
      <Link to={`/tweet/${id}`}>
        <div className="tweet">
          <img src={avatar} className="avatar" alt={`Avatar of ${name}`} />
          <div className="tweet-info">
            <div>
              <span>{name}</span>
              <div>{formatDate(timestamp)}</div>
              {parent && (
                <button
                  className="replying-to"
                  onClick={event => this.toParent(event, id)}
                >
                  replying to @{parent.author}
                </button>
              )}
              <p>{text}</p>
            </div>
            <div className="tweet-icons">
              <TiArrowBackOutline className="tweet-icon" />
              <span>{replies !== 0 && replies}</span>
              <button className="heart-button" onClick={this.handleLike}>
                {hasLiked ? (
                  <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                ) : (
                  <TiHeartOutline className="tweet-icon" />
                )}
              </button>
              <span>{likes !== 0 && likes}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, tweets, users }, { tweetId }) {
  const tweet = tweets[tweetId];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  };
}

export default withRouter(connect(mapStateToProps)(Tweet));
