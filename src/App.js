import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/login/login.js';
import Home from './components/home/home.js';
import OrderComp from "./components/order/order.js";
import UserComp from "./components/user/user";
import CustomerComp from "./components/customer/customer";
import CatalogComp from "./components/catalog/catalog";
import NotFoundComp from "./components/404";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/order" component={OrderComp}></Route>
        <Route exact path="/user" component={UserComp}></Route>
        <Route exact path="/user/:userid" component={UserComp}></Route>
        <Route exact path="/customer" component={CustomerComp}></Route>
        <Route exact path="/catalog" component={CatalogComp}></Route>
        <Route component={NotFoundComp}></Route>
      </Switch>
    </Router>
  );
  // return <Login />;
}
export default App;
