import React, { Suspense } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
const CustomerIndexComp = React.lazy(() => import("./customerindex"));
const AccountIndexComp = React.lazy(() => import("./accountIndex"));

export default function CustomerTabbedComp(props){
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
        aria-label="scrollable customer tabs"
      >
        <Tab label="Customer" />
        <Tab label="Account" />
      </Tabs>
      <Suspense fallback={<div>Loading...</div>}>
        {tabValue === 0 && <CustomerIndexComp />}
        {tabValue === 1 && <AccountIndexComp />}
      </Suspense>
    </React.Fragment>
  );
}