import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from '@material-ui/core/Paper'
import CustomerIndexComp from './customerindex'

export default function CustomerTabbedComp(props){
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  return (
    <Paper className="paper-box">
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
      {(tabValue===0)&&(<CustomerIndexComp />)}
    </Paper>
  );
}