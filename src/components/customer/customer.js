import React from 'react';
import Scaffold from "../common/scaffold";
import CustomerTabbedComp from "./customertabbednav"

export default function CustomerComp(props){
  return (
    <Scaffold title="Customers">
      <CustomerTabbedComp />
    </Scaffold>
  );
}