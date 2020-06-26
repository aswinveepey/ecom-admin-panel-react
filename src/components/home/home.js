import React from 'react';
import AppBarComp from "../common/appbar";
import DashComp from "./dash"
import Paper from '@material-ui/core/Paper'
// import Container from '@material-ui/core/Container'

// import { makeStyles } from "@material-ui/core/styles";


// const useStyles = makeStyles((theme) => ({
//   containerPaper: {
//     minHeight: "52vh",
//     top: "-18vh",
//   },
// }));

export default function Home(props){
  return (
    <div style={{height:'100%'}}>
      <AppBarComp title="Dashboard" />
      <Paper className="paper-container" variant='outlined'>
        <DashComp />
      </Paper>
    </div>
  );
}