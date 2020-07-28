import React from 'react';
import DashComp from "./dash"
import Scaffold from "../common/scaffold"
import { useSelector } from "react-redux";

export default function Home(props){
  const state = useSelector((state) => state.userStateReducer);
  return (
    <Scaffold title={"Hi, "+state.user?.firstname || ""}>
      <DashComp />
    </Scaffold>
  );
}