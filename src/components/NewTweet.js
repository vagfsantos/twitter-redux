import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddTweet } from "../actions/tweets";

class NewTweet extends Component {
  state = {
    text: "",
    toHome: null
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { dispatch, id } = this.props;

    dispatch(handleAddTweet(this.state.text, id));

    this.setState({ text: "", toHome: id ? false : true });
  };

  render() {
    const { text, toHome } = this.state;
    const tweetLeft = 200 - text.length;

    console.log(toHome);
    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">Compose new tweet</h3>
        <form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening..."
            value={text}
            onChange={this.handleChange}
            maxLength="200"
            className="textarea"
          />
          {tweetLeft <= 100 ? (
            <div className="tweet-length">{tweetLeft}</div>
          ) : null}
          <button className="btn" type="submit" disabled={text === ""}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
