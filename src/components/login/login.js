import React from "react";
import Grid from '@material-ui/core/Grid'
import Hidden from "@material-ui/core/Hidden";

import { makeStyles } from "@material-ui/core/styles";

import hhysImage from "../../assets/hhys-full.png";
import LoginFormComp from './loginform'


const useStyles = makeStyles((theme) => ({
  hero: {
    width: "100%",
    // height: "100vh",
  },
  loginForm: {
    width: "100%",
    height: "100vh",
  },
}));

function Login(props){
  const classes = useStyles();
  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item lg={8} md={12} sm={12} xs={12}>
            <img
              src={hhysImage}
              className={classes.hero}
              alt="Not Found"
            />
        </Grid>
      </Hidden>
      <Grid item lg={4} md={12} sm={12} xs={12} >
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.loginForm}
        >
          <Grid item>
            <LoginFormComp />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// export default withWidth()(Login);
export default Login;