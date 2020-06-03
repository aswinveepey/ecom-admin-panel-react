import React from 'react'
import AppBarComp from "../common/appbar";
import OrderIndex from "./orderindex";

class Order extends React.Component{
  render(){
    return (
      <div>
        <AppBarComp title="Orders" />
        <OrderIndex />
      </div>
    );
  }
}
export default Order;