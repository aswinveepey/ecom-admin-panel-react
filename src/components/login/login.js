import React from "react";
import PropTypes from "prop-types";
// import Cookies from "js-cookie";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";

import { makeStyles } from "@material-ui/core/styles";

import brandImage from "../../assets/brand-large.png";
import hhysImage from "../../assets/hhys-full.png";
import LoginFormComp from './loginform'
// import {BRAND_NAME, BASE_URL} from '../../constants'


const useStyles = makeStyles((theme) => ({
  loginPaper: {
    background: "#009be5",
    width: "100%",
    // height: "100%",
    height: "100vh",
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
        <Grid item lg={9} md={12} sm={12} xs={12}>
          <Paper className={classes.loginPaper}>
            <img
              src={hhysImage}
              style={{ width: "100%", height: "100%" }}
              alt="Not Found"
            />
          </Paper>
        </Grid>
      </Hidden>
      <Grid item lg={3} md={12} sm={12} xs={12}>
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
Login.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(Login);