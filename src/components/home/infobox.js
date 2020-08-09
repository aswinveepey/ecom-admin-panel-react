import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from "@material-ui/core/Typography";
//styles import
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  infoBox: {
    // height: "30vh !important",
    padding:10
  },
}));

export default function InfoBox(props) {
  const classes = useStyles(); //use styles
  return (
    <React.Fragment>
      <Paper className={classes.infoBox}>
        <Typography variant="h6" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h3">
          {parseFloat(props.value?.total?.toFixed(2)) || 0}
        </Typography>
        <Typography variant="caption" gutterBottom>
          GMV
        </Typography>
        <Typography variant="h3">{props.value?.customers || 0}</Typography>
        <Typography variant="caption" gutterBottom>
          Customers
        </Typography>
      </Paper>
    </React.Fragment>
  );
}