import React from "react";
import { Navbar, Form, FormControl, Button, InputGroup, Nav } from "react-bootstrap";

class NavBarComponent extends React.Component{
  render(){
    return (
      <Navbar bg="dark" expand="lg" fixed="sticky">
        {/* <Nav className="mr-auto"></Nav> */}
        {/* <Navbar.Brand href="#home" className="navbar-brand mr-auto">Brand Name</Navbar.Brand> */}
        <Nav className="ml-auto">
          <Form>
            <InputGroup>
              <FormControl type="text" placeholder="Search" />
              <InputGroup.Append>
                <Button variant="outline-info">
                  <span className="fa fa-search"></span>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Nav>
      </Navbar>
    );
  }
}
export default NavBarComponent;