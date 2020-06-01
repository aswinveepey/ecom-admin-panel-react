import React from 'react';
import Menu from "react-burger-menu/lib/menus/slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser ,faUsers, faCashRegister } from "@fortawesome/free-solid-svg-icons";

class SidebarComp extends React.Component {
  render() {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/home">
          <FontAwesomeIcon icon={faHome} />
          &nbsp; Home
        </a>
        <a id="user" className="menu-item" href="/home">
          <FontAwesomeIcon icon={faUser} />
          &nbsp; Manage User
        </a>
        <a id="customers" className="menu-item" href="/home">
          <FontAwesomeIcon icon={faUsers} />
          &nbsp; Manage Customer
        </a>
        <a id="orders" className="menu-item" href="/order">
          <FontAwesomeIcon icon={faCashRegister} />
          &nbsp; Manage Order
        </a>
      </Menu>
    );
  }
}
export default SidebarComp;