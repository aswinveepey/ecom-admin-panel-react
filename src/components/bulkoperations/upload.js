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
import DialogActions from "@material-ui/core/DialogActions";
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

// define styles
const useStyles = makeStyles((theme) => ({
  card: {
    // maxWidth: "500px",
    margin: "auto",
    padding: "10px",
  },
  button: {
    // display: "block",
    marginTop: "10px",
    marginRight: "10px",
  },
}));

const dataSetOptions = [
  { value: "productupload", label: "Product Upload" },
  { value: "skuupload", label: "Sku Upload" },
  { value: "inventoryupload", label: "Inventory Upload" },
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
const headers = {
  inventoryupload: InventoryDumpHeaders,
};

export default function UploadComp(props) {
  const classes = useStyles();
  const dataService = new DataService();
  const [dataSetType, setDatasetType] = React.useState(dataSetOptions[0].value);
  const [openFileUploadDialog, setOpenFileUploadDialog] = React.useState(false);
  const [dataSet, setDataSet] = React.useState([]);

  const handleFileUploadClose = () => {
    setOpenFileUploadDialog(false);
  };
  const handleFileUploadOpen = () => {
    setOpenFileUploadDialog(true);
  };
  const handleFileUploadSubmit = () => {
    setOpenFileUploadDialog(false);
    switch (dataSetType) {
      case "inventorydump":
        bulkUploadInventory();
        break;
      default:
        bulkUploadInventory();
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
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
  const handleFileUpload = (data) => {
    const parsedData = data.map((item) => item.data);
    setDataSet(parsedData);
    setOpenFileUploadDialog(false);
  };

  const handleDatasetSelection = (e) => {
    e.preventDefault();
    setDatasetType(e.target.value);
  };
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={4}>
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
        </Grid>
        <Grid item xs={8}>
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
        </Grid>
      </Grid>
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
    </React.Fragment>
  );
}
