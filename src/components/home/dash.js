import React from 'react'
import { Grid } from "@material-ui/core";
import InfoBox from '../common/infobox'
import DashChartComp from './dashchart'

class DashComp extends React.Component {
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
    return (
      <Grid container direction="column" justify="space-evenly">
        <Grid item style={{ margin: "15px" }}>
          <Grid container spacing={2}>
            {infoBoxComponent}
          </Grid>
        </Grid>
        <Grid item style={{ margin: "15px" }}>
          <DashChartComp />
        </Grid>
      </Grid>
    );
  }
}
export default DashComp;