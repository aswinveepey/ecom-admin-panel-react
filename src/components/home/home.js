import React from 'react';
import AppBarComp from "../common/appbar";
import DashComp from "./dash"
import PaperBox from "../common/paperbox"

export default function Home(props){
  return (
    <React.Fragment>
      <AppBarComp title="Dashboard" />
      <PaperBox>
        <DashComp />
      </PaperBox>
    </React.Fragment>
  );
}