import React from "react";
import { CSVLink } from "react-csv";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip"
import GetAppIcon from "@material-ui/icons/GetApp";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";

import DataService from "../../services/data";

// define styles
const useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: "500px",
    margin: "auto",
    padding: "10px",
  },
}));

const dataSetOptions = [
  { value: "orderitemdump", label: "Order Item Dump" },
  { value: "customerdump", label: "Customer Dump" },
  { value: "inventorydump", label: "Inventory Dump" },
  { value: "skudump", label: "Sku Dump" },
];
const OrderDumpHeaders = [
  { label: "Order Date", key: "orderdate" },
  { label: "Order ID", key: "itemorderid" },
  { label: "Order Item ID", key: "orderitemid" },
  { label: "Customer ID", key: "customerid" },
  { label: "Customer Name", key: "customername" },
  { label: "SKU ID", key: "skuid" },
  { label: "SKU Name", key: "skuname" },
  { label: "Category ID", key: "skucategoryid" },
  { label: "Brand ID", key: "skubrandid" },
  { label: "MRP", key: "skumrp" },
  { label: "Discount", key: "skudiscount" },
  { label: "Selling Price", key: "skusellingprice" },
  { label: "Purchase Price", key: "skupurchaseprice" },
  { label: "Shipping Price", key: "skushippingcharges" },
  { label: "Installation Charges", key: "skuinstallationcharges" },
  { label: "Bulk Threshold", key: "skubulkthreshold" },
  { label: "Bulk Discount", key: "skubulkdiscount" },
  { label: "Min Order Qty", key: "skuminorderqty" },
  { label: "Min Order Qty Multiples", key: "skuminorderqtymultiples" },
  { label: "Max Order Qty", key: "skumaxorderqty" },
  { label: "Booked Qty", key: "itemquantitybooked" },
  { label: "Confirmed Qty", key: "itemquantityconfirmed" },
  { label: "Shipped Qty", key: "itemquantityshipped" },
  { label: "Delivered Qty", key: "itemquantitydelivered" },
  { label: "Returned Qty", key: "itemquantityreturned" },
  { label: "Territory ID", key: "itemterritoryid" },
  { label: "Amount", key: "itemamount" },
  { label: "Discount", key: "itemdiscount" },
  { label: "Total Amount", key: "itemtotalamount" },
  { label: "Status", key: "itemstatus" },
];
const CustomerDumpHeaders = [
  { label: "Customer ID", key: "customerid" },
  { label: "Account ID", key: "accountid" },
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Account Name", key: "accountname" },
  { label: "Username", key: "username" },
  { label: "Email", key: "email" },
  { label: "Mobile No", key: "mobilenumber" },
  { label: "Type", key: "type" },
  { label: "Gender", key: "gender" },
  { label: "Birthday", key: "birthday" },
  { label: "Contact Number", key: "contactnumber" },
  { label: "Account Type", key: "accounttype" },
  { label: "Gstin", key: "gstin" },
  { label: "Status", key: "status" },
  { label: "Created At", key: "createdat" },
];
const InventoryDumpHeaders = [
  { label: "Inventory ID", key: "_id" },
  { label: "Territory ID", key: "territoryid" },
  { label: "Territory Name", key: "territoryname" },
  { label: "Product ID", key: "productid" },
  { label: "Product Name", key: "productname" },
  { label: "SKU ID", key: "skuid" },
  { label: "SKU Name", key: "skuname" },
  { label: "Category", key: "categoryname" },
  { label: "Brand", key: "brandname" },
  { label: "Quantity", key: "quantity" },
  { label: "MRP", key: "mrp" },
  { label: "Purchase Price", key: "purchaseprice" },
  { label: "Selling Price", key: "sellingprice" },
  { label: "Discount", key: "discount" },
  { label: "Shipping", key: "shippingcharges" },
  { label: "Installation", key: "installationcharges" },
  { label: "Status", key: "status" },
];
const SkuDumpHeaders = [
  { label: "SKU ID", key: "skuid" },
  { label: "Product ID", key: "productid" },
  { label: "Product Name", key: "productname" },
  { label: "SKU Name", key: "skuname" },
  { label: "Category Name", key: "category" },
  { label: "Brand Name", key: "brand" },
  { label: "MRP", key: "mrp" },
  { label: "Discount", key: "discount" },
  { label: "Selling Price", key: "sellingprice" },
  { label: "Purchase Price", key: "purchaseprice" },
  { label: "Shipping", key: "shippingcharges" },
  { label: "Installation", key: "installationcharges" },
  { label: "Bulk Discount Threshold", key: "bulkdiscountthreshold" },
  { label: "Bulk Discount", key: "bulkdiscount" },
  { label: "Min Order Qty ", key: "minorderqty" },
  { label: "Min Order Qty Multiples", key: "minorderqtystep" },
  { label: "Max Order Qty", key: "maxorderqty" },
  { label: "Status", key: "status" },
  { label: "Created At", key: "createdat" },
];
const headers = {
  orderitemdump: OrderDumpHeaders,
  customerdump: CustomerDumpHeaders,
  inventorydump: InventoryDumpHeaders,
  skudump: SkuDumpHeaders,
};

export default function DownloadComp(props) {
  const classes = useStyles();
  const dataService = new DataService();
  const [dataSetType, setDatasetType] = React.useState(dataSetOptions[0].value);
  const [fetching, setFetching] = React.useState(false);
  const [dataSet, setDataSet] = React.useState([]);

  const csvRef = React.useRef();

  const downloadData = () => {
    switch (dataSetType) {
      case "orderitemdump":
        downloadOrderItemDump();
        break;
      case "customerdump":
        downloadCustomerDump();
        break;
      case "inventorydump":
        downloadInventoryDump();
        break;
      case "skudump":
        downloadSkuDump();
        break;
      default:
        downloadOrderItemDump();
        break;
    }
  };

  const downloadOrderItemDump = ()=>{
    setFetching(true);
    dataService
      .getOrderItemDump()
      .then((data) => {
        setDataSet(data);
        setFetching(false);
        csvRef.current.link.click();
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  }
  const downloadCustomerDump = ()=>{
    setFetching(true);
    dataService
    .getCustomerDump()
      .then((data) => {
        setDataSet(data);
        setFetching(false);
        csvRef.current.link.click();
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  }
  const downloadInventoryDump = () => {
    setFetching(true);
    dataService
      .getInventoryDump()
      .then((data) => {
        setDataSet(data);
        setFetching(false);
        csvRef.current.link.click();
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  };
  const downloadSkuDump = () => {
    setFetching(true);
    dataService
      .getSkuDump()
      .then((data) => {
        setDataSet(data);
        setFetching(false);
        csvRef.current.link.click();
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
  };

  const handleDatasetSelection = (e) => {
    e.preventDefault();
    setDatasetType(e.target.value);
  };

  // React.useEffect(() => {}, [dataSet]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardHeader title="Download Data" />
            <CardContent>
              <TextField
                select
                label="Select Dataset"
                value={dataSetType}
                onChange={handleDatasetSelection}
              >
                {dataSetOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="outlined"
                aria-label="download"
                className={classes.button}
                onClick={downloadData}
                disabled={fetching}
                startIcon={<GetAppIcon />}
              >
                Download
              </Button>
              <CSVLink
                ref={csvRef}
                data={dataSet}
                headers={headers[dataSetType]}
                filename={dataSetType + ".csv"}
                target="_blank"
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card className={classes.card}>
            <CardHeader title="Data Headers" />
            <CardContent>
              {headers[dataSetType]?.map((item) => (
                <Chip key={item.key} variant="outlined" label={item.label} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
