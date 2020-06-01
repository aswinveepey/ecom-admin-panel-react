import React from 'react'
import SidebarComp from "../common/sidebar"
import NavBarComponent from "../common/navbar"
import OrderIndex from "./orderindex";

class Order extends React.Component{
  render(){
    return (
      <div md="12">
        <NavBarComponent />
        <SidebarComp />
        <OrderIndex />
      </div>
    );
  }
}
export default Order;