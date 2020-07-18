import React from 'react'
import { Pie, Line } from "react-chartjs-2";
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const line1 =  {
      title: "Monthly GMV",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "GMV",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "#13424C",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [55, 60, 68, 80, 98, 125],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Monthly GMV",
          fontSize: 20,
        },
        legend: { display: true, position: "right" },
        maintainAspectRatio: false,
      },
    }

const pie1 = {
      title: "Division Wise GMV",
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            label: "Division Wise GMV",
            backgroundColor: ["#13424C", "#1f6a7a", "#2a8ca2"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Floor Tiles", "Kitchen Fittings", "Bathroom Fittings"],
      },
      options: {
        title: {
          display: true,
          text: "Division Wise GMV",
          fontSize: 20,
        },
        legend: { display: true, position: "right" },
        maintainAspectRatio: false,
      },
    }

const pie2 =  {
      title: "Territory Wise GMV",
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            label: "Territory Wise GMV",
            backgroundColor: ["#13424C", "#1f6a7a", "#2a8ca2"],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["APAC", "EMEA", "Europe"],
      },
      options: {
        title: {
          display: true,
          text: "Territory Wise GMV",
          fontSize: 20,
        },
        legend: { display: true, position: "right" },
        maintainAspectRatio: false,
      },
    }

export default function DashChartComp (props){
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(props.monthlyGmv);
    return (
      <Grid container direction="row" spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Paper className="chart-box">
            <Typography gutterBottom={true} variant="h6">
              {/* {pie1.title} */}
            </Typography>
            <Line
              data={line1.data}
              options={line1.options}
              height={200}
            />
          </Paper>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Paper className="chart-box">
            <Typography gutterBottom={true} variant="h6">
              {/* {pie1.title} */}
            </Typography>
            <Pie
              data={pie1.data}
              options={pie1.options}
              height={200}
            />
          </Paper>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <Paper className="chart-box">
            <Typography gutterBottom={true} variant="h6">
              {/* {pie2.title} */}
            </Typography>
            <Pie
              data={pie2.data}
              options={pie2.options}
              height={200}
            />
          </Paper>
        </Grid>
      </Grid>
    );
}
