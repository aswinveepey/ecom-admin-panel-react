import React, { Suspense, lazy } from "react";
import Grid from "@material-ui/core/Grid";
import InfoBox from './infobox'
import GmvTimeSeriesComp from "./gmvtimeseries";

import DataApi from "../../api/data";

const CustomerDoughnut = lazy(() => import("./customerdoughnut"));

export default function DashComp(props) {
  const dataApi = new DataApi();
  const [customerData, setCustomerData] = React.useState()
  const [todayGmv, setTodayGmv] = React.useState();
  const [monthGmv, setMonthGmv] = React.useState();
  const [quarterGmv, setQuarterGmv] = React.useState();
  const [gmvTimeSeries, setGmvTimeSeries] = React.useState();

  React.useEffect(()=>{
    dataApi.getCustomerData().then((data) => data && setCustomerData(data)).catch(err=>console.log(err));
    dataApi.getTodayGmv().then((data) => data && setTodayGmv(data[0])).catch(err=>console.log(err));
    dataApi.getMonthGmv().then((data) => data && setMonthGmv(data[0])).catch(err=>console.log(err));
    dataApi.getQuarterGmv().then((data) => data && setQuarterGmv(data[0])).catch(err=>console.log(err));
    dataApi.getGmvTimeSeries().then((data) => data && setGmvTimeSeries(data)).catch(err=>console.log(err));
  },[props])

    return (
      <React.Fragment>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <InfoBox title="Daily" value={todayGmv} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <InfoBox title="MTD" value={monthGmv} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <InfoBox title="QTD" value={quarterGmv} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Suspense fallback={<div>Loading...</div>}>
                  <CustomerDoughnut data={customerData} />
                </Suspense>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <GmvTimeSeriesComp data={gmvTimeSeries} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
}