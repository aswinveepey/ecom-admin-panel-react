import React from "react";
import { Navbar } from "react-bootstrap";

function NavBarComponent() {
  return (
    <Navbar bg="light" expand="lg" clasname="sidenavbar">
      <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
    </Navbar>
  );
}
export default NavBarComponent;