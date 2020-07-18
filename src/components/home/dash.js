import React from 'react'
import Grid from "@material-ui/core/Grid";
import InfoBox from '../common/infobox'
import DashChartComp from './dashchart'

import DataApi from "../../api/data";

export default function DashComp(props) {
  const dataApi = new DataApi();
  const [customerData, setCustomerData] = React.useState()
  const [currentGmv, setCurrentGmv] = React.useState();
  const [quarterGmv, setQuarterGmv] = React.useState();
  const [monthlyGmv, setMonthlyGmv] = React.useState();

  React.useEffect(()=>{
    dataApi.getCustomerData().then((data) => setCustomerData(data[0]));
    dataApi.getCurrentGmv().then((data) => setCurrentGmv(data[0]));
    dataApi.getQuarterGmv().then((data) => setQuarterGmv(data[0]));
    dataApi.getMonthlyGmv().then((data) => setMonthlyGmv(data));
  },[props])

    return (
      <React.Fragment>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={4} lg={4} key={1}>
                <InfoBox title="No Of Customers" value={customerData?.count} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} key={2}>
                <InfoBox title="MTD GMV" value={currentGmv?.total} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} key={3}>
                <InfoBox title="QTD GMV" value={quarterGmv?.total} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <DashChartComp monthlyGmv={monthlyGmv} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
}