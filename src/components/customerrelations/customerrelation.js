import React, { Suspense } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const LeadIndexComp = React.lazy(() =>
  import("./lead/leadindex")
);

export default function MerchandizingComp(props) {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  return (
    <React.Fragment>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable merch tabs"
      >
        <Tab label="leads" />
        {/* <Tab label="Categories" /> */}
        {/* <Tab label="Brands" /> */}
        {/* <Tab label="Divisions" /> */}
      </Tabs>
      <Suspense fallback={<div>Loading...</div>}>
        {tabValue === 0 && <LeadIndexComp />}
        {/* {tabValue === 1 && <CategoryIndexComp />}
        {tabValue === 2 && <BrandIndexComp />}
        {tabValue === 3 && <DivisionIndexComp />} */}
      </Suspense>
    </React.Fragment>
  );
}
