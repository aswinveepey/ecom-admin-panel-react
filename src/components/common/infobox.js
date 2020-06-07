import React from 'react'
import {Paper, Typography, Grid, Box } from "@material-ui/core";

class InfoBox extends React.Component{
  render(){
    return (
      <div>
        <Paper className="info-box" elevation={2}>
          <Grid container>
            <Grid item>
              <Typography variant="h6">{this.props.title}</Typography>
              <Typography variant="h3">{this.props.value}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default InfoBox;