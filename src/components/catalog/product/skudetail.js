import React from "react";
import Cookies from "js-cookie";
//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ButtonBase from "@material-ui/core/ButtonBase";
//Constants Import
import { BASE_URL } from "../../../constants";
//Component import
import SingleAttributeComp from "../../common/singleattribute";
import ImageUploadComp from "../../common/imageupload";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  gridcontainer: {
    flexGrow: 1,
  },
  griditem: {
    flexGrow: 1,
  },
  gridpaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    // overflow: "scroll",
  },
  sectionpaper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // width:"100%",
    // width: `calc(100% - ${theme.spacing(4)}px)`,
    // overflow: "scroll",
  },
  cardimage: {
    maxHeight: "100px",
    maxWidth: "100px",
    height: "auto",
    width: "auto",
  },
  imagecardcontent: {
    display: "block",
    minHeight: "100px",
    minWidth: "100px",
    // width: "100px",
    // flexGrow: 1,
  },
  imagecard: {
    // display:'flex',
    // justifyContent:'center'
  },
  colGrid: {
    width: "100%",
    // overflow: "scroll",
  },
  addimgbase: {
    margin: "auto",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SkuDetailComp(props) {
  const classes = useStyles();
  const token = Cookies.get("token");
  const [territorySearchString, setTerritorySearchString] = React.useState([]);
  const [territories, setTerritories] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [formControls, setFormControls] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);

  //Change sku name handling
  const onchangeSku = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    if (name === "status") {
      controls[name] = event.target.checked;
    } else {
      controls[name] = value;
    }
    setFormControls(controls);
  };
  //Change territory search term
  const onChangeTerritorySearch = (event) => {
    event.preventDefault();
    setTerritorySearchString(event.target.value);
  };
  //Change sku inventory
  const onchangeInventory = (event, index) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.inventory = controls.inventory || [];
    controls.inventory[index][name] = value;
    setFormControls(controls);
  };
  //Change sku price
  const onchangePrice = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.price = controls.price || {};
    controls.price[name] = value;
    setFormControls(controls);
  };
  //Change sku bulkdiscount
  const onchangeBulkdiscount = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.bulkdiscount = controls.bulkdiscount || {};
    controls.bulkdiscount[name] = value;
    setFormControls(controls);
  };
  //Change sku quantity rules
  const onchangeQuantityrules = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.quantityrules = controls.quantityrules || {};
    if (name === "minorderqtystep") {
      controls.quantityrules[name] = event.target.checked;
    } else {
      controls.quantityrules[name] = value;
    }
    setFormControls(controls);
  };
  //change  attribute name handle
  const onchangeAttribute = (event, index) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.attributes[index][name] = value;
    setFormControls(controls);
  };
  //add a new  attribute
  const onAttributeAdd = (event) => {
    event.preventDefault();
    const controls = { ...formControls };
    !controls.attributes && (controls.attributes = []);
    controls.attributes.push({ name: "", values: "" });
    setFormControls(controls);
  };
  //delete  attribute
  const onAttributeDelete = (event, index) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.attributes.splice(index, 1);
    setFormControls(controls);
  };
  //change display attribute name handle
  const onchangeDattribute = (event, index) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.dattributes[index][name] = value;
    setFormControls(controls);
  };
  //add a new display attribute
  const onDattributeAdd = (event) => {
    event.preventDefault();
    const controls = { ...formControls };
    !controls.dattributes && (controls.dattributes = []);
    controls.dattributes.push({ name: "", values: "" });
    setFormControls(controls);
  };
  //delete display attribute
  const onDattributeDelete = (event, index) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.dattributes.splice(index, 1);
    setFormControls(controls);
  };

  //Image upload handlers
  //handle image upload close
  const handleImageUploadClose = () => {
    setOpenImageUpload(false);
  };
  //new image upload
  function handleImageUploadClick() {
    setOpenImageUpload(true);
  }
  //handle image change
  const handleImageChange = (image) => {
    const controls = { ...formControls };
    controls.assets = controls.assets || {};
    !controls.assets.imgs && (controls.assets.imgs = []);
    controls.assets.imgs.push(image);
    setFormControls(controls);
  };
  //handle image deletion
  const deleteImage = (index) => {
    const controls = { ...formControls };
    controls.assets.imgs.splice(index, 1);
    setFormControls(controls);
  };
  React.useEffect(() => {
    props.data && setFormControls(props.data);
  }, [props]);

  //get open state from props
  React.useEffect(() => {
    setOpen(props.open);
  }, [props]);

  //handle territorys search for inventory
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ searchString: territorySearchString }),
    };
    //fetch data and set data
    if (territorySearchString.length > 2) {
      fetch(BASE_URL + "territory/search", requestOptions, { signal: signal })
        .then(async (data) => {
          const response = await data.json();
          const { status } = data;
          status === 200 && setTerritories(response.data);
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [territorySearchString, token]);

  //delegate close behaviour to parent
  const handleClose = () => {
    props.handleClose();
  };
  //handle submit
  const handleSubmit = () => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formControls),
    };
    //differentiate between update & create
    const SUFFIX_URL = formControls._id
      ? "sku/id/" + formControls._id
      : "sku/";
    //POST category data and handle
    fetch(BASE_URL + SUFFIX_URL, requestOptions, {
      signal: signal,
    })
      .then(async (data) => {
        // const response = await data.json();
        const { status } = data;
        if (status === 200) {
          handleClose();
        }
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        {/* App Bar
            Contains close, submit, & title in between  */}
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="subtitle1"
              className={classes.title}
              gutterBottom
            >
              {formControls?.name || "Add SKU"}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save changes
            </Button>
          </Toolbar>
        </AppBar>
        {/* End App Bar*/}
        {/* Wrap in outlined paper */}
        <Paper className={classes.gridpaper} variant="outlined">
          <Grid container>
            {/* Images card display with add image */}
            <Grid item xs={12}>
              {/* section paper wrap */}
              <Paper className={classes.sectionpaper}>
                {/* section title */}
                <Typography variant="h6" gutterBottom>
                  SKU Images
                </Typography>
                <Grid container spacing={1}>
                  {/* Add sku image grid */}
                  <Grid item md={2} xs={6}>
                    <Card variant="outlined" className={classes.imagecard}>
                      {/* Button base covers card content to make whole card clickable */}
                      <ButtonBase
                        className={classes.addimgbase}
                        onClick={handleImageUploadClick}
                      >
                        <CardContent className={classes.imagecardcontent}>
                          <PhotoCamera />
                          <Typography>Add Image</Typography>
                        </CardContent>
                      </ButtonBase>
                      <CardActions></CardActions>
                    </Card>
                  </Grid>
                  {/* if images loop and display with edit & display */}
                  {formControls?.assets?.imgs?.map((img, index) => (
                    <Grid item md={2} xs={6} key={index}>
                      <Card variant="outlined" className={classes.imagecard}>
                        <CardContent className={classes.imagecardcontent}>
                          <img
                            src={img}
                            alt={"SKU"}
                            className={classes.cardimage}
                          />
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={deleteImage.bind(this, index)}
                          >
                            Delete
                          </Button>
                          <Button size="small" color="secondary">
                            Edit
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {/* SKU basic data section - Name, description, card & brand */}
                <Grid item xs={12} md={6}>
                  <Paper className={classes.sectionpaper}>
                    <Typography variant="h6" gutterBottom>
                      SKU Details
                    </Typography>
                    {formControls?.shortid && (
                      <Typography gutterBottom>
                        # {formControls?.shortid}
                      </Typography>
                    )}
                    {/* Product Name text field */}
                    <TextField
                      label="SKU Name"
                      variant="standard"
                      name="name"
                      fullWidth
                      onChange={onchangeSku}
                      value={formControls?.name || ""}
                    />
                    {/* SKU Status */}
                    <FormControlLabel
                      control={
                        <Switch
                          name="status"
                          checked={
                            formControls.status === undefined
                              ? true
                              : formControls.status
                          }
                          // disabled={!this.state.editTogggle}
                          onChange={onchangeSku}
                          color="primary"
                        />
                      }
                      label="SKU status"
                      labelPlacement="end"
                    />
                  </Paper>
                </Grid>
                {/* Inventory Section */}
                <Grid item xs={12} md={6}>
                  <Paper className={classes.sectionpaper}>
                    <Typography variant="h6" gutterBottom>
                      Manage Inventory
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Inventory is mapped to territories - Use All for inventory
                      without restriction
                    </Typography>
                    {formControls?.inventory?.map((data, index) => (
                      <div key={index}>
                        <Autocomplete
                          options={territories}
                          freeSolo
                          value={data.territory || ""}
                          getOptionLabel={(option) =>
                            typeof option === "string" ? option : option.name
                          }
                          getOptionSelected={(option, value) =>
                            option ? option.name === value.name : false
                          }
                          onChange={(event, value) =>
                            onchangeInventory(event, value)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Territory"
                              name="territory"
                              variant="standard"
                              onChange={(event) =>
                                onChangeTerritorySearch(event)
                              }
                            />
                          )}
                        />
                        <TextField
                          label="Quantity"
                          variant="standard"
                          name="quantity"
                          fullWidth
                          type="number"
                          onChange={onchangeInventory}
                          value={data?.quantity || 0}
                        />
                      </div>
                    ))}
                  </Paper>
                </Grid>
                {/* Business Info section */}
                <Grid item xs={12} md={6}>
                  <Paper className={classes.sectionpaper}>
                    <Typography variant="h6" gutterBottom>
                      Pricing & Business Rules
                    </Typography>
                    {/* SKU MRP */}
                    <TextField
                      label="MRP"
                      variant="standard"
                      name="mrp"
                      fullWidth
                      type="number"
                      onChange={onchangePrice}
                      value={formControls?.price?.mrp || 0}
                    />
                    <TextField
                      label="Discount"
                      variant="standard"
                      name="discount"
                      fullWidth
                      type="number"
                      onChange={onchangePrice}
                      value={formControls?.price?.discount || 0}
                    />
                    <TextField
                      label="Selling Price"
                      variant="standard"
                      name="sellingprice"
                      fullWidth
                      type="number"
                      onChange={onchangePrice}
                      value={formControls?.price?.sellingprice || 0}
                    />
                    <TextField
                      label="Shipping Charges"
                      variant="standard"
                      name="shippingcharges"
                      fullWidth
                      type="number"
                      onChange={onchangePrice}
                      value={formControls?.price?.shippingcharges || 0}
                    />
                    <TextField
                      label="Installation Charges"
                      variant="standard"
                      name="installationcharges"
                      fullWidth
                      type="number"
                      onChange={onchangePrice}
                      value={formControls?.price?.installationcharges || 0}
                    />
                    <TextField
                      label="Bulk discount threshold"
                      variant="standard"
                      name="threshold"
                      fullWidth
                      type="number"
                      onChange={onchangeBulkdiscount}
                      value={formControls?.bulkdiscount?.threshold || 0}
                    />
                    <TextField
                      label="Bulk discount Amount"
                      variant="standard"
                      name="discount"
                      fullWidth
                      type="number"
                      onChange={onchangeBulkdiscount}
                      value={formControls?.bulkdiscount?.discount || 0}
                    />
                    <TextField
                      label="Minimum Order Quantity"
                      variant="standard"
                      name="minorderqty"
                      fullWidth
                      type="number"
                      onChange={onchangeQuantityrules}
                      value={formControls?.quantityrules?.minorderqty || 0}
                    />
                    <TextField
                      label="Maximum Order Quantity"
                      variant="standard"
                      name="maxorderqty"
                      fullWidth
                      type="number"
                      onChange={onchangeQuantityrules}
                      value={formControls?.quantityrules?.maxorderqty || 0}
                    />
                    {/* Min Order Qty Multiple Flag comes here */}
                    <FormControlLabel
                      control={
                        <Switch
                          name="minorderqtystep"
                          checked={
                            formControls?.quantityrules?.minorderqtystep ===
                            undefined
                              ? true
                              : formControls.quantityrules.minorderqtystep
                          }
                          // disabled={!this.state.editTogggle}
                          onChange={onchangeQuantityrules}
                          color="primary"
                        />
                      }
                      label="Min Order Qty Multiple"
                      labelPlacement="end"
                    />
                  </Paper>
                </Grid>
                {/* Attribute Section */}
                <Grid item xs={12} md={6}>
                  <Paper className={classes.sectionpaper}>
                    <Typography variant="h6" gutterBottom>
                      SKU Attributes
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      SKU attribute values are used for sku selection
                    </Typography>
                    <SingleAttributeComp
                      data={formControls.attributes}
                      onchangeAttribute={onchangeAttribute}
                      onAttributeAdd={onAttributeAdd}
                      onAttributeDelete={onAttributeDelete}
                    />
                    <Typography variant="subtitle2" gutterBottom>
                      Display Attributes are used for display alone - Use for
                      additional info
                    </Typography>
                    <SingleAttributeComp
                      data={formControls.dattributes}
                      onchangeAttribute={onchangeDattribute}
                      onAttributeAdd={onDattributeAdd}
                      onAttributeDelete={onDattributeDelete}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Dialog>
      {/* Image upload component on click */}
      <ImageUploadComp
        open={openImageUpload}
        handleDialogClose={handleImageUploadClose}
        handleImageChange={handleImageChange}
        keyPath="sku/"
      />
    </React.Fragment>
  );
}
