import React from "react";
//Material ui core imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
// import Grid from "@material-ui/core/Grid";
//Material Icon Imports
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
//styles import
import { withStyles } from "@material-ui/core/styles";
//Relative imports
import DrawerComp from "./drawer"; //sidebar drawer

const styles = (theme) => ({
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
  search: {
    position: "relative",
    borderBottom: '2px solid black',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm" | "md" | "xs")]: {
      width: "25ch",
      "&:focus": {
        width: "125ch",
      },
    },
  },
});
class AppBarComp extends React.Component {
  static defaultProps = {
    search: true,
  };
  state = { open: false };
  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.setState({ open: false });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <AppBar position="static" className="appbar">
          <Toolbar className="app-toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              {this.props.title}
            </Typography>
            {this.props.search && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            )}
          </Toolbar>
          {/* Todo - Implement Search Bar */}
        </AppBar>
        <DrawerComp open={this.state.open} handler={this.handleDrawerToggle} />
      </div>
    );
  }
}

export default withStyles(styles)(AppBarComp);
