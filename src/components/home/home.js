import React from 'react';
import AppBarComp from "../common/appbar";
import DashComp from "./dash"
import {Paper} from '@material-ui/core'

class Home extends React.Component {
  render(){
    return (
      <div>
        <AppBarComp title="Dashboard" />
        <Paper className="paper-container">
          <DashComp />
        </Paper>
      </div>
    );
  }
}

export default Home;