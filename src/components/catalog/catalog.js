import React, { Suspense } from "react";
import AppBarComp from "../common/appbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PaperBox from "../common/paperbox";

const CategoryIndexComp = React.lazy(()=>import("./category/categoryindex"))
const BrandIndexComp = React.lazy(()=>import("./brand/brandindex"))
const ProductIndexComp = React.lazy(()=>import("./product/productindex"))
const DivisionIndexComp = React.lazy(()=>import("./division/divisionindex"))



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
        <Suspense fallback={<div>Loading...</div>}>
          {tabValue === 0 && <ProductIndexComp />}
          {tabValue === 1 && <CategoryIndexComp />}
          {tabValue === 2 && <BrandIndexComp />}
          {tabValue === 3 && <DivisionIndexComp />}
        </Suspense>
      </PaperBox>
    </div>
  );
}
