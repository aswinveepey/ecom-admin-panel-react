import React from "react";
import AppBarComp from "./common/appbar";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import NotFound from '../assets/404.png'
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top: "-18vh",
    position: "relative",
    margin: "2%",
    padding: "1%",
  },
}));

export default function NotFoundcomp(props){
  const classes = useStyles();
  return (
    <div>
      <AppBarComp search={false} />
      <Paper className={classes.raisedpaper}>
        <img
          src={NotFound}
          style={{ width: "100%", height: "100%" }}
          alt="Not Found"
        />
      </Paper>
    </div>
  );

}
