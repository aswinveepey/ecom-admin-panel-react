import apiFeedbackReducer from "./apifeedback"
import orderUpdateReducer from "./orderupdate";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ apiFeedbackReducer, orderUpdateReducer });

export default rootReducer;