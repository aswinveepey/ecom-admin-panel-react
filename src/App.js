import React, { Suspense, lazy } from "react";
import './App.css';
import LoaderComp from "./components/loader"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Login = lazy(() => import("./components/login/login.js"));
const Home = lazy(() => import("./components/home/home.js"));
const OrderComp = lazy(() => import("./components/order/order.js"));
const UserComp = lazy(() => import("./components/user/user"));
const CustomerComp = lazy(() => import("./components/customer/customer"));
const CatalogComp = lazy(() => import("./components/catalog/catalog"));
const NotFoundComp = lazy(() => import("./components/404"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoaderComp/>}>
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
      </Suspense>
    </Router>
  );
  // return <Login />;
}
export default App;
