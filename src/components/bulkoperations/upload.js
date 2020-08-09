import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
// import Chip from "@material-ui/core/Chip";
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
    width: "100%",
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
  // const [fetching, setFetching] = React.useState(false);
  // const [dataSet, setDataSet] = React.useState([]);

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
              <CardActions>
                <Button
                  color="primary"
                  variant="outlined"
                  aria-label="upload file"
                  className={classes.button}
                  // onClick={downloadData}
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
                  // startIcon={<PublishIcon />}
                >
                  Submit
                </Button>
              </CardActions>
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
    </React.Fragment>
  );
}
