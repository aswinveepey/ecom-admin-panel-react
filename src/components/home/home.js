import React from 'react';
import DashComp from "./dash"
import Scaffold from "../common/scaffold"

export default function Home(props){
  return (
    <Scaffold title="Dashboard">
      <DashComp />
    </Scaffold>
  );
}