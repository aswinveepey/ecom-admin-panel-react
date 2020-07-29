import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";

export default function InfoBox(props){
  return (
    <React.Fragment>
      <Paper className="info-box" variant="elevation" elevation={1}>
            <Typography variant="h6" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="h4">{props.value?.total || 0}</Typography>
            <Typography variant="caption" gutterBottom>GMV</Typography>
            <Typography variant="h4">{props.value?.customers || 0}</Typography>
            <Typography variant="caption" gutterBottom>Customers</Typography>
      </Paper>
    </React.Fragment>
  );
}