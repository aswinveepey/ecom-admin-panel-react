import React from 'react'
//cookie library import
import Cookies from "js-cookie";

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

//realtive imports
// import { BRAND_NAME } from "../../constants";
import { BASE_URL } from "../../constants";
import hhysLogo from "../../assets/hhyslogo.png";

const useStyles = makeStyles((theme) => ({
  drawerdiv:{
    width:'240px'
  },
  logoImg:{
    width:'40%'
  }
}))

function DrawerComp(props){
  // const drawerInitState = props.open;
  const classes = useStyles();
  const token = Cookies.get("token");
  const [drawerOpen, setDrawerOpen] = React.useState(props.open);
  const [navData, setNavData] = React.useState([]);
  
  const handleDrawerToggle = () => {
    props.handler();
  };

  //fetch drawer data
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      fetch(BASE_URL + "user/nav/", requestOptions, {
        signal: signal,
      })
        .then(async (data) => {
          const response = await data.json();
          // console.log(response);
          const { status } = data;
          status === 200 && setNavData(response);
          // console.log(options)
        })
        .catch((err) => console.log(err));
    } catch (error) {}
    return function cleanup() {
      abortController.abort();
    };
  }, [token]);

  //open drawer
  React.useEffect(() => {
    // console.log(drawerOpen);
    setDrawerOpen(props.open);
  }, [props.open]);
  function renderIcon(param) {
    var SwitchComp;
    switch (param) {
      case "home":
        SwitchComp = <Dashboard />
        break;
      case "users":
        SwitchComp = <Contacts />;
        break;
      case "customer":
        SwitchComp = <GroupIcon />;
        break;
      case "orders":
        SwitchComp = <Receipt />;
        break;
      case "invoices":
        SwitchComp = <Queue />;
        break;
      default:
        SwitchComp = <Dashboard />
    }
    return SwitchComp;
  }


  return (
    <nav>
      <Drawer variant="persistent" open={drawerOpen} anchor="left">
        <div className={classes.drawerdiv}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
          <Divider />
          <div>
            <List>
              <ListItem>
                <img src={hhysLogo} alt="logo" className={classes.logoImg} />
              </ListItem>
            </List>
            <Divider />
            <List>
              {navData.map((item) => (
                <ListItem button key={item.name} component="a" href={item.nav}>
                  <ListItemIcon>{renderIcon(item.name)}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Divider />
          </div>
        </div>
      </Drawer>
    </nav>
  );
}

export default DrawerComp;