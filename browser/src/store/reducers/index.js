import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { DashboardReducer } from "./dashboard";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    DashboardReducer,
  });
