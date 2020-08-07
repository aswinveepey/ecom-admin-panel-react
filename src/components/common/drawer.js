import React from "react";

// import Hidden from '@material-ui/core/Hidden'
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Dashboard from "@material-ui/icons/Dashboard";
import Contacts from "@material-ui/icons/Contacts";
import GroupIcon from "@material-ui/icons/Group";
import Receipt from "@material-ui/icons/Receipt";
import Queue from "@material-ui/icons/Queue";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";

import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

//realtive imports
// import { BRAND_NAME } from "../../constants";
import UserService from "../../services/user";

const useStyles = makeStyles((theme) => ({
  drawerdiv: {
    width: "240px",
  },
  logoImg: {
    width: "40%",
  },
}));

export default function DrawerComp(props) {
  // const drawerInitState = props.open;
  const classes = useStyles();
  const tenantLogoFile = "logo-hhys.png";
  const tenantLogo =
    "https://litcomassets.s3.ap-south-1.amazonaws.com/tenantassets/" +
    tenantLogoFile;
  const userApi = new UserService(); //get user data
  const [navData, setNavData] = React.useState([]);

  //fetch drawer data
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    try {
      userApi
        .getNav(signal)
        .then(async (data) => {
          setNavData(data);
        })
        .catch((err) => console.log(err));
    } catch (error) {}
    return function cleanup() {
      abortController.abort();
    };
  }, [props]);

  function renderIcon(param) {
    var SwitchComp;
    switch (param) {
      case "home":
        SwitchComp = <Dashboard />;
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
        SwitchComp = <Dashboard />;
    }
    return SwitchComp;
  }

  return (
    <div className={classes.drawerdiv}>
      <IconButton onClick={props.handleDrawerToggle}>
        <ChevronLeftIcon />
      </IconButton>
      <Divider />
      <List>
        <ListItem>
          <img src={tenantLogo} alt="brand logo" className={classes.logoImg} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {navData.map((item) => (
          <ListItem
            button
            key={item.name}
            component={NavLink}
            to={item.nav}
            activeClassName="Mui-selected"
            onClick={props.handleDrawerToggle}
          >
            <ListItemIcon>{renderIcon(item.name)}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Divider />
    </div>
  );
}
