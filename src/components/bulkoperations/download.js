import React from "react";
import { CSVLink } from "react-csv";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip"
import GetAppIcon from "@material-ui/icons/GetApp";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";

import DataService from "../../services/data";

import {
  CustomerDumpHeaders,
  OrderDumpHeaders,
  InventoryDumpHeaders,
  SkuDumpHeaders,
  ProductDumpHeaders,
} from "./headers";

// define styles
const useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: "500px",
    marginBottom: "10px",
    padding: "10px",
  },
}));

const dataSetOptions = [
  { value: "orderitemdump", label: "Order Item Dump" },
  { value: "customerdump", label: "Customer Dump" },
  { value: "inventorydump", label: "Inventory Dump" },
  { value: "skudump", label: "Sku Dump" },
  { value: "productdump", label: "Product Dump" },
];

const headers = {
  orderitemdump: OrderDumpHeaders,
  customerdump: CustomerDumpHeaders,
  inventorydump: InventoryDumpHeaders,
  skudump: SkuDumpHeaders,
  productdump: ProductDumpHeaders,
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
      case "productdump":
        downloadProductDump();
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
  const downloadProductDump = () => {
    setFetching(true);
    dataService
      .getProductDump()
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
      {/* <Grid container spacing={1}> */}
        {/* <Grid item xs={4}> */}
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
        {/* </Grid> */}
        {/* <Grid item xs={8}> */}
          <Card className={classes.card}>
            <CardHeader title="Data Headers" />
            <CardContent>
              {headers[dataSetType]?.map((item) => (
                <Chip key={item.key} variant="outlined" label={item.label} />
              ))}
            </CardContent>
          </Card>
        {/* </Grid> */}
      {/* </Grid> */}
    </React.Fragment>
  );
}
