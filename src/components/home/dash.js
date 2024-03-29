import React, { Suspense, lazy } from "react";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import InfoBox from './infobox'
import GmvTimeSeriesComp from "./gmvtimeseries";

import DataService from "../../services/data";

const CustomerDoughnut = lazy(() => import("./customerdoughnut"));

export default function DashComp(props) {
  const [customerData, setCustomerData] = React.useState()
  const [todayGmv, setTodayGmv] = React.useState();
  const [monthGmv, setMonthGmv] = React.useState();
  const [quarterGmv, setQuarterGmv] = React.useState();
  const [gmvTimeSeries, setGmvTimeSeries] = React.useState();
  const [timeSeriesToggle, setTimeSeriesToggle] = React.useState("quarterly")

  const handleTimeSeriesToggle = (event, newValue)=>{
    setTimeSeriesToggle(newValue);
  }

  React.useEffect(()=>{
    const dataService = new DataService();
    dataService.getCustomerData().then((data) => data && setCustomerData(data)).catch(err=>console.log(err));
    dataService.getGmv({param:"daily"}).then((data) => data && setTodayGmv(data[0])).catch(err=>console.log(err));
    dataService.getGmv({param:"monthly"}).then((data) => data && setMonthGmv(data[0])).catch(err=>console.log(err));
    dataService.getGmv({param:"quarterly"}).then((data) => data && setQuarterGmv(data[0])).catch(err=>console.log(err));
  },[])

  React.useEffect(() => {
    const dataService = new DataService();
    dataService
      .getGmvTimeSeries({ param: timeSeriesToggle })
      .then((data) => data && setGmvTimeSeries(data))
      .catch((err) => console.log(err));
  }, [timeSeriesToggle]);

    return (
      <React.Fragment>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={12} md={4}>
                <InfoBox title="Daily" value={todayGmv} />
              </Grid>
              <Grid item xs={12} md={4}>
                <InfoBox title="MTD" value={monthGmv} />
              </Grid>
              <Grid item xs={12} md={4}>
                <InfoBox title="QTD" value={quarterGmv} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Suspense fallback={<div>Loading...</div>}>
                  <CustomerDoughnut data={customerData} />
                </Suspense>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              value={timeSeriesToggle}
              exclusive
              onChange={handleTimeSeriesToggle}
              aria-label="text alignment"
            >
              <ToggleButton value="quarterly" aria-label="quarterly">
                Quarterly
              </ToggleButton>
              <ToggleButton value="monthly" aria-label="monthly">
                Monthly
              </ToggleButton>
              <ToggleButton value="daily" aria-label="daily">
                Daily
              </ToggleButton>
            </ToggleButtonGroup>
            <GmvTimeSeriesComp data={gmvTimeSeries} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
}