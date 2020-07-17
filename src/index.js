import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/styles";
import {Provider} from "react-redux"
import store from "../src/store"

import theme from './theme/muitheme'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from "./history";

// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
