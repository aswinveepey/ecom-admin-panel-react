import React from "react";
import Paper from "@material-ui/core/Paper";
//Material ui core imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer"
//Material Icon Imports
import MenuIcon from "@material-ui/icons/Menu";
//styles import
import { makeStyles } from "@material-ui/core/styles";
//Relative imports
import DrawerComp from "./drawer"; //sidebar drawer
import AppSearchComp from './appsearch'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top: "10vh",
    width: "96%",
    margin: "2%",
    position: "absolute",
    padding: "1%",
    minHeight: "70vh",
    // overflow:"auto"
  },
  content: {
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appbar: {
    height: "30vh !important",
  },
  apptoolbar: {
    top: "2vh !important",
  },
}));

export default function Scaffold(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState(true);
  const handleDrawerToggle = ()=>{
    setOpen(!open);
  }
  React.useEffect(() => {
    if (props.search === false) {
      setSearch(false);
    }
  }, [props]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.apptoolbar}>
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
      <nav className={classes.drawer}>
        <Drawer
          variant="persistent"
          open={open}
          anchor="left"
          onClose={handleDrawerToggle}
        >
          <DrawerComp handleDrawerToggle={handleDrawerToggle}/>
        </Drawer>
      </nav>
      <main className={classes.content}>
        <Paper className={classes.raisedpaper}>{props.children}</Paper>
      </main>
    </div>
  );
}
