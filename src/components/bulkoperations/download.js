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
const headers = { orderitemdump: OrderDumpHeaders };

export default function DownloadComp(props) {
  const classes = useStyles();
  const dataService = new DataService();
  const [dataSetType, setDatasetType] = React.useState(dataSetOptions[0].value);
  const [fetching, setFetching] = React.useState(false);
  const [dataSet, setDataSet] = React.useState([]);

  const csvRef = React.useRef();

  const downloadData = () => {
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
  };

  const handleDatasetSelection = (e) => {
    e.preventDefault();
    setDatasetType(e.target.value);
  };

  React.useEffect(() => {}, [dataSet]);

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
              {headers[dataSetType].map((item) => (
                <Chip key={item.key} variant="outlined" label={item.label} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
