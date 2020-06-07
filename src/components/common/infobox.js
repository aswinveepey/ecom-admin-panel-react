import React from 'react'
import {Paper, Typography, Grid } from "@material-ui/core";

class InfoBox extends React.Component{
  render(){
    return (
      <div>
        <Paper className="info-box" variant="outlined" square>
          <Grid container>
            <Grid item style={{marginLeft:'35%'}}>
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