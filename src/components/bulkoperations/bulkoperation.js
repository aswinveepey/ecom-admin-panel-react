import React, { Suspense } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const DownloadComp = React.lazy(() => import("./download"));
const UploadComp = React.lazy(() => import("./upload"));

export default function BulkOperationsComp(props) {
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
        aria-label="scrollable bulk operations tabs"
      >
        <Tab label="Download" />
        <Tab label="Upload" />
      </Tabs>
      <Suspense fallback={<div>Loading...</div>}>
        {tabValue === 0 && <DownloadComp />}
        {tabValue === 1 && <UploadComp />}
      </Suspense>
    </React.Fragment>
  );
}
