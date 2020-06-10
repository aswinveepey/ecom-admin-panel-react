import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DashboardIcon from "@material-ui/icons/Dashboard";

class InfoBox extends React.Component{
  render(){
    return (
      <div>
        <Paper className="info-box" variant="elevation" elevation={1} square>
          <Grid container>
            <Grid item xs={4}>
              <DashboardIcon />
            </Grid>
            <Grid item xs={8}>
              <Grid container direction="column" justify="center">
                <Grid item xs={12}>
                  <Typography variant="h6">{this.props.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h3">{this.props.value}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default InfoBox;