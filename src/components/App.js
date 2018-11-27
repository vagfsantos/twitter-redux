import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitalData } from "../actions/shared";
import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitalData());
  }

  render() {
    return <div>{this.props.loading ? null : <Dashboard />}</div>;
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
