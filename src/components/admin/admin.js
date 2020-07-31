import React, { Suspense } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
const TerritoryComp = React.lazy(() => import("./territory/territory"));
const RoleComp = React.lazy(() => import("./role/role"));
const UserComp = React.lazy(() => import("./user/user"));

export default function AdminComp(props) {
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
        <Tab label="User" />
        <Tab label="Territory" />
        <Tab label="Roles" />
      </Tabs>
      <Suspense fallback={<div>Loading...</div>}>
        {tabValue === 0 && <UserComp />}
        {tabValue === 1 && <TerritoryComp />}
        {tabValue === 2 && <RoleComp />}
      </Suspense>
    </React.Fragment>
  );
}
