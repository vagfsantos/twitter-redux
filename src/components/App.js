import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitalData } from "../actions/shared";
import Dashboard from "./Dashboard";

import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import LoadingBar from "react-redux-loading";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading ? null : (
          <TweetPage match={{ params: { id: "2mb6re13q842wu8n106bhk" } }} />
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
