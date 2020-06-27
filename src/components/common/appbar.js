import React from "react";
//Material ui core imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//Material Icon Imports
import MenuIcon from "@material-ui/icons/Menu";
//styles import
import { makeStyles } from "@material-ui/core/styles";
//Relative imports
import DrawerComp from "./drawer"; //sidebar drawer
import AppSearchComp from './appsearch'

// export default withStyles(styles)(AppBarComp);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function AppBarComp(props){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState(true);

  function handleDrawerToggle(){
    setOpen(!open);
  }
  React.useEffect(()=>{
    if (props.search === false) {
      setSearch(false);
    }
  },[props])
  return (
    <div className={classes.root}>
      <AppBar position="static" className="appbar">
        <Toolbar className="app-toolbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {props.title}
          </Typography>
          {search && <AppSearchComp />}
        </Toolbar>
      </AppBar>
      <DrawerComp open={open} handler={handleDrawerToggle} />
    </div>
  );

}
