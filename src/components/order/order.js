import React from "react";
import AppBarComp from "../common/appbar";
import OrderIndexComp from "./orderindex";
import PaperBox from "../common/paperbox";

export default function OrderComp(props) {
  return (
    <div>
      <AppBarComp title="Order" />
      <PaperBox>
        <OrderIndexComp />
      </PaperBox>
    </div>
  );
}
