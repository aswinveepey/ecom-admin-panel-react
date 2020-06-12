import React from "react";
import AppBarComp from "./common/appbar";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import NotFound from '../assets/404.png'

class NotFoundComp extends React.Component {
  render() {
    return (
      <div>
        <AppBarComp search={false} />
        <Paper className="paper-container">
          <img src={NotFound} style={{width:'100%', height:'100%'}} alt='Not Found' />
        </Paper>
      </div>
    );
  }
}

export default NotFoundComp;
