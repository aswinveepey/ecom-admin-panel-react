import React from 'react';
import SidebarComp from "../common/sidebar";
import NavBarComponent from "../common/navbar";
import DashComp from "./dash"

class Home extends React.Component {
  render(){
    return (
      <div>
          <NavBarComponent />
          <SidebarComp />
          <DashComp/>
      </div>
    );
  }
}

export default Home;