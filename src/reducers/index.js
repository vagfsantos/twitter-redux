import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import tweets from "./tweets";
import users from "./users";
import authedUser from "./authedUser";

export default combineReducers({
  authedUser,
  tweets,
  users,
  loadingBar: loadingBarReducer
});
