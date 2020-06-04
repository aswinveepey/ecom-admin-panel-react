import React from 'react';
import {Divider, List, ListItem, ListItemIcon, ListItemText, Drawer} from '@material-ui/core'
import Dashboard from "@material-ui/icons/Dashboard";
import Contacts from "@material-ui/icons/Contacts";
import GroupIcon from "@material-ui/icons/Group";
import Receipt from "@material-ui/icons/Receipt";
import Queue from "@material-ui/icons/Queue";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import { BRAND_NAME } from "../../constants";

class DrawerComp extends React.Component {

  render() {
    const drawer = (
      <div style={{width:'240px'}}>
        <IconButton onClick={this.props.handler}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        <div>
          <List>
            <ListItem>{BRAND_NAME}</ListItem>
            <ListItem>Version 1.0</ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="Home" component="a" href="home">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="Users" component="a" href="user">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button key="Customers" component="a" href="home">
              <ListItemIcon>
                <Contacts />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button key="Orders" component="a" href="order">
              <ListItemIcon>
                <Queue />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button key="Invoices" component="a" href="home">
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
              <ListItemText primary="Invoices" />
            </ListItem>
          </List>
          <Divider />
          <Divider />
        </div>
      </div>
    );
    return (
        <Drawer
          variant="persistent"
          anchor="left"
          open={this.props.open}
          // ModalProps={{
          //   keepMounted: true, // Better open performance on mobile.
          // }}
        >
          {drawer}
        </Drawer>
    );
  }
}
export default DrawerComp;