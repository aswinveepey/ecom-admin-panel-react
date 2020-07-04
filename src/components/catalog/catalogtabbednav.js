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
        <Tab label="Categories" />
        <Tab label="Brands" />
        <Tab label="Products" />
      </Tabs>
      {tabValue === 0 && <CategoryIndexComp />}
      {tabValue === 1 && <BrandIndexComp />}
      {tabValue === 2 && <ProductIndexComp />}
    </PaperBox>
  );
}
