import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PublishIcon from "@material-ui/icons/Publish";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";

import { CSVReader } from "react-papaparse";

import DataService from "../../services/data";
import LoaderComp from "../loader"

import {
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
  button: {
    // display: "block",
    marginTop: "10px",
    marginRight: "10px",
  },
}));

const dataSetOptions = [
  // { value: "productupload", label: "Product Upload" },
  { value: "skuupload", label: "Sku Upload" },
  { value: "inventoryupload", label: "Inventory Upload" },
  { value: "productupload", label: "Product Upload" },
  { value: "orderitemupload", label: "Order Upload" },
];

const headers = {
  inventoryupload: InventoryDumpHeaders,
  skuupload: SkuDumpHeaders,
  productupload: ProductDumpHeaders,
  orderitemupload: OrderDumpHeaders,
};

export default function UploadComp(props) {
  const classes = useStyles();
  const dataService = new DataService();
  const [dataSetType, setDatasetType] = React.useState(dataSetOptions[0].value);
  const [openFileUploadDialog, setOpenFileUploadDialog] = React.useState(false);
  const [dataSet, setDataSet] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleFileUploadClose = () => {
    setOpenFileUploadDialog(false);
  };
  const handleFileUploadOpen = () => {
    setOpenFileUploadDialog(true);
  };
  const handleFileUploadSubmit = () => {
    setOpenFileUploadDialog(false);
    setLoading(true);
    switch (dataSetType) {
      case "inventoryupload":
        bulkUploadInventory();
        break;
      case "skuupload":
        bulkUploadSku();
        break;
      case "productupload":
        bulkUploadProduct();
        break;
      case "orderitemupload":
        bulkUploadOrderItem();
        break;
      default:
        // bulkUploadInventory();
        break;
    }
  };
  const bulkUploadInventory = ()=>{
    Promise.all(
      dataSet.map((item) =>
        dataService
          .bulkUploadInventory({ param: item })
          .then((data) => console.log(data))
      )
    )
      .then((data) => setLoading(false))
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }
  const bulkUploadSku = ()=>{
    Promise.all(
      dataSet.map((item) =>
        dataService
          .bulkUploadSku({ param: item })
          .then((data) => console.log(data))
      )
    )
      .then((data) => setLoading(false))
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }
  const bulkUploadProduct = ()=>{
    Promise.all(
      dataSet.map((item) =>
        dataService
          .bulkUploadProduct({ param: item })
          .then((data) => console.log(data))
      )
    )
      .then((data) => setLoading(false))
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }
  const bulkUploadOrderItem = () => {
    Promise.all(
      dataSet.map((item) =>
        dataService
          .bulkUploadOrderItem({ param: item })
          .then((data) => console.log(data))
      )
    )
      .then((data) => setLoading(false))
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleFileUpload = (data) => {
    const parsedData = data.map((item) => item.data);
    setDataSet(parsedData);
    setOpenFileUploadDialog(false);
  };

  const handleDatasetSelection = (e) => {
    e.preventDefault();
    setDatasetType(e.target.value);
    setDataSet([])
  };
  return (
    <React.Fragment>
          <Card className={classes.card}>
            <CardHeader title="Upload file" />
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
              <Grid container direction="column">
                <Grid item>
                  <Typography display="inline" variant="caption">
                    *accepts csv files.First row is header
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    variant="outlined"
                    aria-label="upload file"
                    className={classes.button}
                    onClick={handleFileUploadOpen}
                    // disabled={fetching}
                    startIcon={<PublishIcon />}
                  >
                    Upload
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    aria-label="submit Data"
                    className={classes.button}
                    onClick={handleFileUploadSubmit}
                    // disabled={fetching}
                  >
                    Verify & Submit
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardHeader title="Preview" />
            <CardContent>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {headers[dataSetType]?.map((header) => (
                        <TableCell key={header.key}>{header.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataSet.map((item, index) => (
                      <TableRow key={index}>
                        {Object.values(item)?.map((value, index) => (
                          <TableCell key={index}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
      <Dialog
        open={openFileUploadDialog}
        onClose={handleFileUploadClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="csv-upload-dialog"
      >
        <DialogTitle id="file-upload-dialog-title">Upload File</DialogTitle>
        <DialogContent>
          <CSVReader
            onDrop={handleFileUpload}
            // onError={this.handleOnError}
            config={{ skipEmptyLines: true, header: true }}
            // addRemoveButton
            // onRemoveFile={this.handleOnRemoveFile}
          >
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
        </DialogContent>
      </Dialog>
      {loading && <LoaderComp/>}
    </React.Fragment>
  );
}