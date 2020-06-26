import React from 'react';
import AppBarComp from "../common/appbar";
import CustomerTabbedComp from "./customertabbednav"

export default function CustomerComp(props){
  return (
    <div>
      <AppBarComp title="Customers" />
      <CustomerTabbedComp />
    </div>
  )
}