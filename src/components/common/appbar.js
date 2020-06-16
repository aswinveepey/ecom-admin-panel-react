import React from "react";
//Material ui core imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Grid from "@material-ui/core/Grid";
//Material labs import
// import Autocomplete from "@material-ui/lab/Autocomplete";
//Material Icon Imports
import MenuIcon from "@material-ui/icons/Menu";
//styles import
import { withStyles } from "@material-ui/core/styles";
//Relative imports
import DrawerComp from "./drawer"; //sidebar drawer
import AppSearchComp from './appsearch'

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
});
class AppBarComp extends React.Component {
  //default props
  static defaultProps = {
    search: true,
  };
  //state variable
  state = {
    open: false,
    // searchdata: [],
    // searchOpen: false,
    // token: Cookies.get("token"),
  };
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
  // handleSearchInputChange = async (event) => {
  //   const searchString = event.target.value;
  // };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
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
            {this.props.search && <AppSearchComp />}
          </Toolbar>
        </AppBar>
        <DrawerComp open={this.state.open} handler={this.handleDrawerToggle} />
      </div>
    );
  }
}

export default withStyles(styles)(AppBarComp);
