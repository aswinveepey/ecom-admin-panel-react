import React from "react";
//Material ui core imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
//Material Icon Imports
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
//Relative imports
import DrawerComp from "./drawer"; //sidebar drawer

class AppBarComp extends React.Component {
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
    return (
      <div>
        {/* <CssBaseline /> */}
        <AppBar position="static" className="appbar" >
          <Toolbar className='app-toolbar'>
            <Grid container>
              <Grid item lg={4}>
                <Grid container>
                  <Grid item>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleDrawerToggle}
                      edge="start"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                  <Grid item style={{ padding: "8px" }}>
                    <Typography variant="h6" noWrap>
                      {this.props.title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={6}>
                <Grid container>
                  <Grid item style={{ padding: "8px" }}>
                    <SearchIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="outlined"
                      placeholder="Search..."
                      fullWidth={true}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          {/* Todo - Implement Search Bar */}
        </AppBar>
        <DrawerComp open={this.state.open} handler={this.handleDrawerToggle} />
      </div>
    );
  }
}
export default AppBarComp;
