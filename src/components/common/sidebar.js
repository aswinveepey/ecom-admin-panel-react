import React from 'react';
import Menu from "react-burger-menu/lib/menus/slide";

class SidebarComp extends React.Component {
  render() {
    return (
      <Menu >
        <a id="user" className="menu-item" href="/home">
          Manage User
        </a>
        <a id="customers" className="menu-item" href="/home">
          Manage Customer
        </a>
        <a id="orders" className="menu-item" href="/home">
          Manage Order
        </a>
      </Menu>
    );
  }
}
export default SidebarComp;