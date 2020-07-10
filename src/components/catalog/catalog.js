import React from "react";
import AppBarComp from "../common/appbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CategoryIndexComp from "./category/categoryindex";
import BrandIndexComp from "./brand/brandindex";
import ProductIndexComp from "./product/productindex";
import DivisionIndexComp from "./division/divisionindex";
import PaperBox from "../common/paperbox";



export default function CatalogComp(props) {
  const [tabValue, setTabValue] = React.useState(0);
  const handleChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  return (
    <div>
      <AppBarComp title="Catalog" />
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
        {tabValue === 3 && <DivisionIndexComp />}
      </PaperBox>
    </div>
  );
}
