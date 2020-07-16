import React from "react";
import Scaffold from "../common/scaffold";
import OrderIndexComp from "./orderindex";

export default function OrderComp(props) {
  return (
    <React.Fragment>
      <Scaffold title="Orders">
        <OrderIndexComp />
      </Scaffold>
    </React.Fragment>
  );
}
