import React from 'react';
import AppBarComp from "../common/appbar";
import CustomerTabbedComp from "./customertabbednav"

import Paper from '@material-ui/core/Paper'


export default function CustomerComp(props){
  return (
    <div>
      <AppBarComp title="Customers" />
      <Paper className="paper-container">
        <CustomerTabbedComp />
      </Paper>
    </div>
  )
}