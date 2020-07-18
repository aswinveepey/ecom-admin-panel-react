import React from 'react'
// import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import InfoBox from '../common/infobox'
import DashChartComp from './dashchart'
import { withStyles } from "@material-ui/core/styles";

import DataApi from "../../api/data";

const dataApi = new DataApi();


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
    authStatus: "",
    customerData:{},
  };
  componentDidMount() {
    // this.fetchDashData();
    this.fetchCustomerData();
    this.fetchCurrentGmv();
  }
  // fetchDashData = async () => {
  //   let token;
  //   try {
  //     token = Cookies.get("token");
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
    // const requestOptions = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json", Authorization: token },
    // };
    // const fetchResponse = await fetch(BASE_URL + "user/dash/", requestOptions);
    // const { status } = fetchResponse;
    // if (status === 200) {
    //   this.setState({ authStatus: "authenticated" });
    // } else {
    //   this.setState({ authStatus: "unAuthenticated" });
    // }
  // };
  fetchCustomerData = () => {
    dataApi.getCustomerData().then((data) => this.setState({ customerData: data }));
  };
  fetchCurrentGmv = () => {
    dataApi.getCurrentGmv().then((data) => this.setState({ currentGmv: data }));
  };
  render() {
    const infoBoxData = [
      // { id: 1, title: "No of Customers", value: "2340" },
      // { id: 2, title: "Monthly GMV", value: "10 Cr" },
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
          <Typography variant="overline">
            Not Authenticated. Try refreshing the page or{" "}
            <Link href="/">logging in</Link> again
          </Typography>
        </div>
      );
    }
    return (
      <React.Fragment>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={4} lg={4} key={1}>
                  <InfoBox
                    title="No Of Customers"
                    value={this.state.customerData?.active}
                  />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} key={2}>
                  <InfoBox
                    title="Monthly GMV"
                    value={this.state.currentGmv?.total}
                  />
              </Grid>
              {infoBoxComponent}
            </Grid>
          </Grid>
          <Grid item>
            <DashChartComp />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withStyles(useStyles)(DashComp);