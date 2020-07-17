import apiFeedbackReducer from "./apifeedback"
import { combineReducers } from "redux";

const rootReducer = combineReducers({ apiFeedbackReducer });

export default rootReducer;