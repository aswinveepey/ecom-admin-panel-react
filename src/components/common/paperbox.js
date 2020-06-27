import React from 'react'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top: "-18vh",
    position: "relative",
    margin: "2%",
    padding: "1%",
  },
}));


export default function PaperBox(props){
  const classes = useStyles();
  return (
    <Paper className={classes.raisedpaper}>
      {props.children}
    </Paper>
  )
}