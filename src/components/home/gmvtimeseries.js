import React from 'react'
import { Line } from "react-chartjs-2";
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default function GmvTimeSeriesComp (props){
  const [gmvTimeSeries, setGmvTimeSeries] = React.useState([]);

  const line = {
    title: "GMV Time Series",
    data: {
      labels: gmvTimeSeries.map((item) => item._id),
      datasets: [
        {
          label: "GMV",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "#13424C",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: gmvTimeSeries.map((item) => item.total),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "GMV Time Series",
        fontSize: 20,
      },
      legend: { display: true, position: "right" },
      maintainAspectRatio: false,
    },
  };
  React.useEffect(()=>{
    props.data && setGmvTimeSeries(props.data);
  },[props])
    return (
      <Paper className="chart-box">
        <Typography gutterBottom={true} variant="h6"></Typography>
        <Line data={line.data} options={line.options} height={200} />
      </Paper>
    );
}
