import React from 'react'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top: "10vh",
    width:'96%',
    margin:'2%',
    position:"absolute",
    padding: "1%",
    minHeight:"70vh",
    // overflow:"auto"
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