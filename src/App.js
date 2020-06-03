import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/login/login.js';
import Home from './components/home/home.js';
import Order from './components/order/order.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/order" component={Order}></Route>
      </Switch>
    </Router>
  );
  // return <Login />;
}
export default App;
