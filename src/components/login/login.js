import React from "react";
import Cookies from "js-cookie";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { makeStyles } from "@material-ui/core/styles";

import brandImage from "../../assets/brand-large.png";
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

export default function Login(props){
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item lg={9} md={8} sm={12} xs={12}>
        <Paper className={classes.loginPaper}>
          <img
            src={brandImage}
            style={{ width: "100%", height: "100%" }}
            alt="Not Found"
          />
        </Paper>
      </Grid>
      <Grid item lg={3} md={4} sm={12} xs={12}>
        <Grid
            container
            justify="center"
            alignContent="center"
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