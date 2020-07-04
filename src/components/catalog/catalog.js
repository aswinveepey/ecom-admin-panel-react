import React from "react";
import AppBarComp from "../common/appbar";
import CatalogTabbedComp from "./catalogtabbednav";



export default function CatalogComp(props) {
  return (
    <div>
      <AppBarComp title="Catalog" />
      <CatalogTabbedComp />
    </div>
  );
}
