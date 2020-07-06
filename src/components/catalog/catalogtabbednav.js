import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CategoryIndexComp from "./category/categoryindex";
import BrandIndexComp from "./brand/brandindex";
import ProductIndexComp from "./product/productindex";
import PaperBox from "../common/paperbox"

export default function CatalogTabbedComp(props) {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  return (
    <PaperBox>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable catalog tabs"
      >
        <Tab label="Products" />
        <Tab label="Categories" />
        <Tab label="Brands" />
        <Tab label="Divisions" />
      </Tabs>
      {tabValue === 0 && <ProductIndexComp />}
      {tabValue === 1 && <CategoryIndexComp />}
      {tabValue === 2 && <BrandIndexComp />}
      {tabValue === 3 && (<div>Divisions</div>)}
    </PaperBox>
  );
}
