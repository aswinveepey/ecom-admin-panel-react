import React from 'react'
// import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import InfoBox from '../common/infobox'
import DashChartComp from './dashchart'
import Cookies from "js-cookie";
import { withStyles } from "@material-ui/core/styles";

import { BASE_URL } from "../../constants";


const useStyles = (theme) => ({
  raisedpaper: {
    top: "-18vh",
    position: "relative",
    margin: "2%",
    padding: "1%",
  },
});
class DashComp extends React.Component {
  state = {
    authStatus: '',
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
    const fetchResponse = await fetch(BASE_URL + "user/dash/", requestOptions);
    const { status } = fetchResponse;
    if (status===200){
      this.setState({ authStatus: "authenticated" });
    } else {
      this.setState({ authStatus: "unAuthenticated" });
    }
  }
  render() {
    const { classes } = this.props;
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
    if (this.state.authStatus === "unAuthenticated") {
      return (
        <div>
          <Typography variant='overline'>
            Not Authenticated. Try refreshing the page or{" "}
            <Link href="/">logging in</Link> again
          </Typography>
        </div>
      );
    } 
    return (
      <div className={classes.raisedpaper}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container spacing={1}>
              {infoBoxComponent}
            </Grid>
          </Grid>
          <Grid item>
            <DashChartComp />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles)(DashComp);