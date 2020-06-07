import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerComp from "./drawer";

class AppBarComp extends React.Component {
  state = { open: false };
  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  escFunction = (event)=>{
    if (event.keyCode === 27) {
      this.setState({ open: false });
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  render() {
    return (
      <div>
        {/* <CssBaseline /> */}
        <AppBar position="relative" className="appbar">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {this.props.title}
            </Typography>
          </Toolbar>
          {/* Todo - Implement Search Bar */}
        </AppBar>
        <DrawerComp open={this.state.open} handler={this.handleDrawerToggle} />
      </div>
    );
  }
}
export default AppBarComp;