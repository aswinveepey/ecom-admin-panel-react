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
import { DropzoneArea } from "material-ui-dropzone";
import DialogTitle from "@material-ui/core/DialogTitle";
import PublishIcon from "@material-ui/icons/Publish";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";

// import DataService from "../../services/data";

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

export default function UploadComp(props) {
  const classes = useStyles();
  // const dataService = new DataService();
  const [dataSetType, setDatasetType] = React.useState(dataSetOptions[0].value);
  const [openFileUploadDialog, setOpenFileUploadDialog] = React.useState(false);
  // const [dataSet, setDataSet] = React.useState([]);

  const handleFileUploadClose = ()=>{
    setOpenFileUploadDialog(false);
  }
  const handleFileUploadOpen = ()=>{
    setOpenFileUploadDialog(true);
  }
  const handleFileUploadSubmit = ()=>{
    setOpenFileUploadDialog(false);
  }
  const handleFileUpload = (file) => {
    // const file = event.target.files[0]
    console.log(file)
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
                    *accepts csv files.First row is skipped
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
                    // onClick={downloadData}
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
            <CardContent></CardContent>
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
        <DialogTitle id="image-upload-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
          <DropzoneArea
            open={true}
            onChange={handleFileUpload}
            filesLimit={1}
            acceptedFiles={[
              ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values",
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFileUploadClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFileUploadSubmit} color="primary">
            Upload File
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
