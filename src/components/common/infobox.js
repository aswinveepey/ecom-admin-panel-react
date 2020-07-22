import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function InfoBox(props){
  return (
      <React.Fragment>
        <Paper className="info-box" variant="elevation" elevation={1}>
          <Grid container direction="column">
            <Grid item xs={12}>
              <Typography variant="overline">{props.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{props.value}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
}