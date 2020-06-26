import React from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from '@material-ui/core/Paper'
import CustomerIndexComp from './customerindex'
import AccountIndexComp from './accountIndex'
//Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top: "-18vh",
    position: "relative",
    margin: "2%",
    padding: "1%",
  },
}));

export default function CustomerTabbedComp(props){
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  return (
    <Paper className={classes.raisedpaper}>
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
      {(tabValue===1)&&(<AccountIndexComp />)}
    </Paper>
  );
}