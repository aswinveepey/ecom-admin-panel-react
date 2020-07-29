import React from "react";
import Paper from "@material-ui/core/Paper";
//Material ui core imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer"
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
//Material Icon Imports
import MenuIcon from "@material-ui/icons/Menu";
//styles import
import { makeStyles } from "@material-ui/core/styles";
//Relative imports
import DrawerComp from "./drawer"; //sidebar drawer
import AppSearchComp from './appsearch'
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import UserApi from "../../api/user";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top: "10vh",
    width: "96%",
    margin: "2%",
    position: "absolute",
    padding: "1%",
    minHeight: "70vh",
    overflow:"auto"
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
  const dispatch = useDispatch();
  const userApi = new UserApi();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [search, setSearch] = React.useState(true);

  const apifeedbackState = useSelector((state) => state.apiFeedbackReducer);
  const userState = useSelector((state) => state.userStateReducer);

  const handleDrawerToggle = ()=>{
    setOpen(!open);
  }
  const handleSnackBarClose = ()=>{
    setSnackBarOpen(false);
    dispatch({
      type: "APIERROR",
      payLoad: null,
    });
    dispatch({
      type: "APISUCCESS",
      payLoad: null,
    });
  }
  React.useEffect(() => {
    (apifeedbackState.apisuccess || apifeedbackState.apierror) &&
      setSnackBarOpen(true);
  }, [apifeedbackState]);

  React.useEffect(() => {
    if (props.search === false) {
      setSearch(false);
    }
  }, [props]);
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!userState.firstname) {
      userApi
        .getSelf(signal)
        .then((data) => {
          data && dispatch({
            type: "SETUSER",
            payLoad: data,
          });
          !data && history && history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [userState.firstname]);

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
          <div className={classes.title}>
            <Typography variant="h6" noWrap>
              {props.title}
            </Typography>
            <ArrowDropDownIcon />
          </div>
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
          <DrawerComp handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </nav>
      <main className={classes.content}>
        <Paper className={classes.raisedpaper}>{props.children}</Paper>
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
      >
        <React.Fragment>
          {apifeedbackState.apierror && (
            <Alert severity="error">{apifeedbackState.apierror}</Alert>
          )}
          {apifeedbackState.apisuccess && (
            <Alert severity="success">{apifeedbackState.apisuccess}</Alert>
          )}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackBarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      </Snackbar>
    </div>
  );
}
