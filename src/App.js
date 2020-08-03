import React, { Suspense, lazy } from "react";
import './App.css';
import LoaderComp from "./components/loader"
import Scaffold from "./components/common/scaffold"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
// import APIFeedbackProvider from "../src/providers/apifeedbackprovider";

const Login = lazy(() => import("./components/login/login.js"));
const Home = lazy(() => import("./components/home/home.js"));
const OrderComp = lazy(() => import("./components/order/order.js"));
const UserComp = lazy(() => import("./components/admin/user/user"));
const CustomerComp = lazy(() => import("./components/customer/customer"));
const CatalogComp = lazy(() => import("./components/catalog/catalog"));
const Merchandizingomp = lazy(() => import("./components/merchandizing/merchandizing"));
const AdminComp = lazy(() => import("./components/admin/admin"));
const NotFoundComp = lazy(() => import("./components/404"));

export default function App() {
  const state = useSelector((state) => state.userStateReducer);
  return (
    <Suspense fallback={<LoaderComp />}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Scaffold title={"Hi, " + (state.user?.firstname || "")}>
            <Switch>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/order" component={OrderComp}></Route>
              {/* <Route exact path="/user/:userid" component={UserComp}></Route> */}
              <Route exact path="/customer" component={CustomerComp}></Route>
              <Route exact path="/catalog" component={CatalogComp}></Route>
              <Route exact path="/merchandizing" component={Merchandizingomp}></Route>
              <Route exact path="/admin" component={AdminComp}></Route>
              <Route component={NotFoundComp}></Route>
            </Switch>
          </Scaffold>
        </Switch>
      </Router>
    </Suspense>
  );
}
