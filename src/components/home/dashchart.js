import React from 'react'
import { Line } from "react-chartjs-2";
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

export default function DashChartComp (props){
  const [monthlyGmv, setMonthlyGmv] = React.useState([])

  const line1 = {
    title: "Monthly GMV",
    data: {
      labels: monthlyGmv.map((item) => item._id),
      datasets: [
        {
          label: "GMV",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "#13424C",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: monthlyGmv.map((item) => item.total),
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
  };
  React.useEffect(()=>{
    props.monthlyGmv && setMonthlyGmv(props.monthlyGmv)
  },[props])
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
      </Grid>
    );
}
