import apiFeedbackReducer from "./apifeedback"
import orderUpdateReducer from "./orderupdate";
import userStateReducer from "./userstate";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  apiFeedbackReducer,
  orderUpdateReducer,
  userStateReducer,
});

export default rootReducer;