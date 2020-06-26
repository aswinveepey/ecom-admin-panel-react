import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import CategoryIndexComp from "./category/categoryindex";
import BrandIndexComp from "./brand/brandindex";
import ProductIndexComp from "./product/productindex";

import { makeStyles } from "@material-ui/core/styles";
// import AccountIndexComp from "./accountIndex";


const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top:"-18vh",
    position:'relative',
    margin:'2%'
  },
}));

export default function CatalogTabbedComp(props) {
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
        aria-label="scrollable catalog tabs"
      >
        <Tab label="Categories" />
        <Tab label="Brands" />
        <Tab label="Products" />
      </Tabs>
      {tabValue === 0 && <CategoryIndexComp />}
      {tabValue === 1 && <BrandIndexComp />}
      {tabValue === 2 && <ProductIndexComp />}
    </Paper>
  );
}
