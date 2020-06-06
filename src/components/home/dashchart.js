import React from 'react'
import { Pie } from "react-chartjs-2";
import {Paper, Typography, Grid} from '@material-ui/core'

class DashChartComp extends React.Component {
  state = {
    data: this.props.data,
    options: this.props.options,
  };
  render() {
    return (
      <Grid container direction="row" spacing={2}>
        <Grid item lg={6}>
          <Paper style={{ padding: "15px" }}>
            <Typography gutterBottom={true} variant="h6">
              Category Wise GMV
            </Typography>
            <Pie data={this.state.data} options={this.state.options} height={200} />
          </Paper>
        </Grid>
        <Grid item lg={6}>
          <Paper style={{ padding: "15px" }}>
            <Typography gutterBottom={true} variant="h6">
              Category Wise GMV
            </Typography>
            <Pie data={this.state.data} options={this.state.options} height={200} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default DashChartComp;