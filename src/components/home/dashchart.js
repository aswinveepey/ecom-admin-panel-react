import React from 'react'
import { Pie } from "react-chartjs-2";
import {Paper, Typography, Grid} from '@material-ui/core'

class DashChartComp extends React.Component{
  render(){
    const data = {
      datasets: [
        {
          data: [10, 20, 30],
          label: "Category Wise GMV",
          backgroundColor: ["#93948d", "#eaf2b6", "rgb(255, 99, 134)"],
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Category1", "Category2", "Category3"],
    };
    const options = {
      legend: { display: true, position: "left" },
      maintainAspectRatio: false,
    };
    return (
      <Grid container direction="row" spacing={2}>
        <Grid item lg={6}>
          <Paper style={{ padding: "15px" }}>
            <Typography gutterBottom={true} variant="h6">
              Category Wise GMV
            </Typography>
            <Pie data={data} options={options} height={200} />
          </Paper>
        </Grid>
        <Grid item lg={6}>
          <Paper style={{ padding: "15px" }}>
            <Typography gutterBottom={true} variant="h6">
              Category Wise GMV
            </Typography>
            <Pie data={data} options={options} height={200}/>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default DashChartComp;