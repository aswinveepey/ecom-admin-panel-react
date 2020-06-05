import React from 'react';
import AppBarComp from "../common/appbar";
import DashComp from "./dash"

class Home extends React.Component {
  render(){
    return(
      <div>
      <AppBarComp title="Dashboard" />
      <DashComp />
    </div>
    );
  }
}

export default Home;