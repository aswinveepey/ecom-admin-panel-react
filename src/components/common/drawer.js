import React from 'react'

// import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Drawer from '@material-ui/core/Drawer'

import Dashboard from "@material-ui/icons/Dashboard";
import Contacts from "@material-ui/icons/Contacts";
import GroupIcon from "@material-ui/icons/Group";
import Receipt from "@material-ui/icons/Receipt";
import Queue from "@material-ui/icons/Queue";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import { makeStyles } from '@material-ui/core/styles';

import { BRAND_NAME } from "../../constants";

const useStyles = makeStyles((theme) => (null))

function DrawerComp(props){
  // const drawerInitState = props.open;
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(props.open);
  
  const handleDrawerToggle = () => {
    props.handler();
  };
  React.useEffect(() => {
    console.log(drawerOpen);
    setDrawerOpen(props.open);
  }, [props.open]);

  const drawer = (
      <div style={{width:'240px'}}>
        <IconButton onClick={handleDrawerToggle}>
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
            <ListItem button key="Home" component="a" href="/home">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button key="Users" component="a" href="/user">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button key="Customers" component="a" href="/home">
              <ListItemIcon>
                <Contacts />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button key="Orders" component="a" href="/order">
              <ListItemIcon>
                <Queue />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button key="Invoices" component="a" href="/home">
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
    <Drawer variant="persistent" open={drawerOpen} anchor="left">
      {drawer}
    </Drawer>
  );
}

export default DrawerComp;