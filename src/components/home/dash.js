import React from 'react'
import { Grid, LinearProgress, Link, Typography } from "@material-ui/core";
import InfoBox from '../common/infobox'
import DashChartComp from './dashchart'
import Cookies from "js-cookie";

import { BASE_URL } from "../../constants";

class DashComp extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    authStatus: 'loading',
  };
  componentDidMount(){
    this.fetchDashData();
  }
  fetchDashData = async ()=>{
    let token;
    try {
      token = Cookies.get("token");
    } catch (error) {
      console.log(error);
      return null;
    }
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    const fetchResponse = await fetch(BASE_URL + "dash/", requestOptions);
    const { status } = fetchResponse;
    if (status===200){
      this.setState({ authStatus: "authenticated" });
    } else {
      this.setState({ authStatus: "unAuthenticated" });
    }
  }
  render() {
    const infoBoxData = [
      { id: 1, title: "No of Customers", value: "2340" },
      { id: 2, title: "Monthly GMV", value: "10 Cr" },
      { id: 3, title: "Quarterly GMV", value: "20 Cr" },
    ];
    const infoBoxComponent = infoBoxData.map((data) => (
      <Grid item xs={12} sm={12} md={4} lg={4} key={data.id}>
        <InfoBox title={data.title} value={data.value} />
      </Grid>
    ));
    const chartData = {
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
    const chartOptions = {
      legend: { display: true, position: "left" },
      maintainAspectRatio: false,
    };
    if (this.state.authStatus === "unAuthenticated") {
      return (
        <div>
          <Typography variant='overline'>
            Not Authenticated. Try refreshing the page or{" "}
            <Link href="/">logging in</Link> again
          </Typography>
        </div>
      );
    } else if (this.state.authStatus === "loading") {
      return <LinearProgress color='secondary'/>;
    }
    return (
      <Grid container direction="column" justify="space-evenly">
        <Grid item style={{ margin: "15px" }}>
          <Grid container spacing={2}>
            {infoBoxComponent}
          </Grid>
        </Grid>
        <Grid item style={{ margin: "15px" }}>
          <DashChartComp data={chartData} options={chartOptions} />
        </Grid>
      </Grid>
    );
  }
}
export default DashComp;