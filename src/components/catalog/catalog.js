import React from "react";
import AppBarComp from "../common/appbar";
import CatalogTabbedComp from "./catalogtabbednav";
import Paper from "@material-ui/core/Paper";



export default function CatalogComp(props) {
  return (
    <div>
      <AppBarComp title="Catalog" />
      {/* <Paper className="paper-container" variant='outlined'> */}
        <CatalogTabbedComp />
      {/* </Paper> */}
    </div>
  );
}
