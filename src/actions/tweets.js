import { saveLikeToggle, saveTweet } from "../utils/api";
import { hideLoading, showLoading } from "react-redux-loading";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";
export const ADD_TWEET = "ADD_TWEET";

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  };
}

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser: author } = getState();

    dispatch(showLoading);

    saveTweet({
      text,
      replyingTo,
      author
    }).then(tweet => {
      dispatch(addTweet(tweet));
      dispatch(hideLoading);
    });
  };
}

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  };
}

function toggleTweet({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  };
}

export function handleToggleTweet(info) {
  return dispatch => {
    dispatch(toggleTweet(info));

    return saveLikeToggle(info).catch(error => {
      console.warn(error);
      alert("There was an error when liking this tweet");
      dispatch(toggleTweet(info));
    });
  };
}
