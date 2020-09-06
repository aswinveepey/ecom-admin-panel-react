import React from "react";
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
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ButtonBase from "@material-ui/core/ButtonBase";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputAdornment from "@material-ui/core/InputAdornment";
//Component import
import SingleAttributeComp from "../../common/singleattribute";
import FilterAttributeComp from "../../common/filterattribute";
import ImageUploadComp from "../../common/imageupload";
//api import
import SkuService from "../../../services/sku";
import TerritoryService from "../../../services/territory";
import { PropertyKeys } from "ag-grid-community";

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
  },
  imagecard: {
    // display:'flex',
    // justifyContent:'center'
  },
  colGrid: {
    width: "100%",
  },
  addimgbase: {
    margin: "auto",
  },
  // dialog: {
  //   minHeight: "90vh",
  //   maxHeight: "90vh",
  //   marginTop:"auto",
  //   marginLeft:"auto",
  // },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const skuService = new SkuService();
const territoryService = new TerritoryService();

export default function SkuDetailComp(props) {
  const classes = useStyles();
  const [territorySearchString, setTerritorySearchString] = React.useState("");
  const [territories, setTerritories] = React.useState([]);
  const [skuId, setSkuId] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [formControls, setFormControls] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);
  const [openThumbnailUpload, setOpenThumbnailUpload] = React.useState(false);

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
  //Change SKU Inventory
  const onChangeInventory = (index, event) => {
    event.preventDefault();

    const value = event.target.value;
    const name = event.target.name;
    const controls = { ...formControls };
    controls.inventory = controls.inventory || [];

    if (name === "status") {
      controls.inventory[index]["status"] = event.target.checked;
    } else {
      controls.inventory[index][name] = value;
    }
    setFormControls(controls);
  };

  const changeInventoryTerritory = (index, event, territory )=> {
    
    event.preventDefault();
    const controls = { ...formControls };
    controls.inventory = controls.inventory || [];
    controls.inventory[index]["territory"] = territory;
    setFormControls(controls);

  }
  //Add new SKU Inentory
  const onAddInventory = (event) => {
    event.preventDefault();
    const controls = { ...formControls };
    !controls.inventory && (controls.inventory = []);
    controls.inventory.push({
      mrp: controls.price.mrp,
      discount: controls.price.discount,
      sellingprice: controls.price.sellingprice,
      purchaseprice: controls.price.purchaseprice,
      shippingcharges: controls.price.shippingcharges,
      installationcharges: controls.price.installationcharges,
    });
    setFormControls(controls);
  };
  //Change sku price
  const onChangePrice = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.price = controls.price || {};
    controls.price[name] = value;
    setFormControls(controls);
  };
  //Change sku bulkdiscount
  const onChangeBulkdiscount = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.bulkdiscount = controls.bulkdiscount || {};
    controls.bulkdiscount[name] = value;
    setFormControls(controls);
  };
  //Change sku quantity rules
  const onChangeQuantityrules = (event) => {
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
  const onChangeAttribute = (event, index) => {
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

  //Thumbnail upload handlers
  //handle thumnail upload close
  const handleThumbnailUploadClose = () => {
    setOpenThumbnailUpload(false);
  };
  //new image upload
  function handleThumbnailUploadClick() {
    setOpenThumbnailUpload(true);
  }
  //handle image change
  const handleThumbnailChange = (thumbnail) => {
    const controls = { ...formControls };
    controls.assets = controls.assets || {};
    controls.assets["thumbnail"] = thumbnail;
    setFormControls(controls);
  };
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
    setOpen(props.open);
    if (props.data._id) {
      // for edit option set sku id and retrieve data
      setSkuId(props.data._id);
    } else {
      // for new creation set product & create
      setFormControls(props.data);
    }
  }, [props.data, props.open]);

  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    skuId &&
      skuService
        .getOneSku(signal, skuId)
        .then((data) => setFormControls(data))
        .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [skuId]);

  //handle territorys search for inventory
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    territoryService
      .searchTerritories(signal, territorySearchString)
      .then((data) => setTerritories(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [territorySearchString]);

  //delegate close behaviour to parent
  const handleClose = () => {
    props.handleClose();
  };
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    if (formControls._id) {
      skuService
        .updateSku(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    } else {
      skuService
        .createSku(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <form onSubmit={handleSubmit}>
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
              <Typography variant="subtitle1" className={classes.title}>
                {formControls?.name || "Add SKU"}
              </Typography>
              <Button color="inherit" type="submit">
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
                    <Grid item md={3} xs={6}>
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
                      <Grid item md={3} xs={6} key={index}>
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
                    <Grid item md={3} xs={6}>
                      {formControls?.assets?.thumbnail ? (
                        <Card variant="outlined">
                          <CardHeader subheader="Thumbnail" />
                          <CardContent className={classes.imagecardcontent}>
                            <img
                              src={formControls.assets.thumbnail}
                              className={classes.cardimage}
                              alt="sku thumbnail"
                            />
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              color="secondary"
                              onClick={handleThumbnailUploadClick}
                            >
                              Replace
                            </Button>
                          </CardActions>
                        </Card>
                      ) : (
                        <Card variant="outlined">
                          {/* Button base covers card content to make whole card clickable */}
                          <ButtonBase
                            className={classes.addthumbnailbase}
                            onClick={handleThumbnailUploadClick}
                          >
                            <CardContent
                              className={classes.thumbnailcardcontent}
                            >
                              <PhotoCamera />
                              <Typography>Add Thumbnail</Typography>
                            </CardContent>
                          </ButtonBase>
                          <CardActions></CardActions>
                        </Card>
                      )}
                    </Grid>
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
                        required
                        onChange={onchangeSku}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {props?.product?.name}
                            </InputAdornment>
                          ),
                        }}
                        value={formControls?.name || ""}
                      />
                      {/* SKU Status */}
                      <FormControlLabel
                        control={
                          <Switch
                            name="status"
                            checked={
                              formControls?.status === undefined
                                ? true
                                : formControls?.status
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
                        required
                        type="number"
                        onChange={onChangePrice}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.price?.mrp || 0}
                      />
                      <TextField
                        label="Discount"
                        variant="standard"
                        name="discount"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangePrice}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.price?.discount || 0}
                      />
                      <TextField
                        label="Selling Price"
                        variant="standard"
                        name="sellingprice"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangePrice}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.price?.sellingprice || 0}
                      />
                      <TextField
                        label="Purchase Price"
                        variant="standard"
                        name="purchaseprice"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangePrice}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.price?.purchaseprice || 0}
                      />
                      <TextField
                        label="Shipping Charges"
                        variant="standard"
                        name="shippingcharges"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangePrice}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.price?.shippingcharges || 0}
                      />
                      <TextField
                        label="Installation Charges"
                        variant="standard"
                        name="installationcharges"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangePrice}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.price?.installationcharges || 0}
                      />
                      <TextField
                        label="Bulk discount threshold"
                        variant="standard"
                        name="threshold"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangeBulkdiscount}
                        inputProps={{ min: 0 }}
                        value={formControls?.bulkdiscount?.threshold || 0}
                      />
                      <TextField
                        label="Bulk discount Amount"
                        variant="standard"
                        name="discount"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangeBulkdiscount}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.bulkdiscount?.discount || 0}
                      />
                      <TextField
                        label="Minimum Order Quantity"
                        variant="standard"
                        name="minorderqty"
                        fullWidth
                        required
                        type="number"
                        onChange={onChangeQuantityrules}
                        inputProps={{ min: 0 }}
                        value={formControls?.quantityrules?.minorderqty || 0}
                      />
                      <TextField
                        label="Maximum Order Quantity"
                        variant="standard"
                        name="maxorderqty"
                        required
                        fullWidth
                        type="number"
                        onChange={onChangeQuantityrules}
                        inputProps={{ min: 0 }}
                        value={formControls?.quantityrules?.maxorderqty || 0}
                      />
                      {/* Min Order Qty Multiple Flag comes here */}
                      <FormControlLabel
                        control={
                          <Switch
                            name="minorderqtystep"
                            size="small"
                            checked={
                              formControls?.quantityrules?.minorderqtystep ===
                              undefined
                                ? true
                                : formControls?.quantityrules.minorderqtystep
                            }
                            // disabled={!this.state.editTogggle}
                            onChange={onChangeQuantityrules}
                            color="primary"
                          />
                        }
                        label="Min Order Qty Multiple"
                        labelPlacement="end"
                      />
                    </Paper>
                  </Grid>
                  {/* Inventory Section */}
                  <Grid item xs={12}>
                    <Paper className={classes.sectionpaper}>
                      <Typography variant="h6" gutterBottom>
                        Manage Inventory
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Inventory is mapped to territories - Use All for
                        inventory without restriction
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={onAddInventory}
                        // className={classes.attrbutton}
                      >
                        Add Inventory
                      </Button>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            {formControls?.inventory?.map((data, index) => (
                              <TableRow key={index}>
                                <TableCell width="20%">
                                  <Autocomplete
                                    options={territories}
                                    freeSolo
                                    value={data.territory || ""}
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.name
                                    }
                                    getOptionSelected={(option, value) =>
                                      option ? option._id === value._id : false
                                    }
                                    onChange={changeInventoryTerritory.bind(
                                      this,
                                      index
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Territory"
                                        name="territory"
                                        variant="standard"
                                        required
                                        onChange={onChangeTerritorySearch}
                                      />
                                    )}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    label="Quantity"
                                    variant="standard"
                                    name="quantity"
                                    fullWidth
                                    type="number"
                                    required
                                    onChange={onChangeInventory.bind(
                                      this,
                                      index
                                    )}
                                    inputProps={{ min: 0 }}
                                    value={data?.quantity || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    label="MRP"
                                    variant="standard"
                                    name="mrp"
                                    fullWidth
                                    type="number"
                                    required
                                    onChange={onChangeInventory.bind(
                                      this,
                                      index
                                    )}
                                    inputProps={{ min: 0, step: "any" }}
                                    value={data?.mrp || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    label="Discount"
                                    variant="standard"
                                    name="discount"
                                    fullWidth
                                    type="number"
                                    required
                                    onChange={onChangeInventory.bind(
                                      this,
                                      index
                                    )}
                                    inputProps={{ min: 0, step: "any" }}
                                    value={data?.discount || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    label="Selling"
                                    variant="standard"
                                    name="sellingprice"
                                    fullWidth
                                    type="number"
                                    required
                                    onChange={onChangeInventory.bind(
                                      this,
                                      index
                                    )}
                                    inputProps={{ min: 0, step: "any" }}
                                    value={data?.sellingprice || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    label="Purchase"
                                    variant="standard"
                                    name="purchaseprice"
                                    fullWidth
                                    type="number"
                                    required
                                    onChange={onChangeInventory.bind(
                                      this,
                                      index
                                    )}
                                    inputProps={{ min: 0, step: "any" }}
                                    value={data?.purchaseprice || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    label="Shipping"
                                    variant="standard"
                                    name="shippingcharges"
                                    fullWidth
                                    type="number"
                                    required
                                    onChange={onChangeInventory.bind(
                                      this,
                                      index
                                    )}
                                    inputProps={{ min: 0, step: "any" }}
                                    value={data?.shippingcharges || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    label="Installation"
                                    variant="standard"
                                    name="installationcharges"
                                    fullWidth
                                    type="number"
                                    required
                                    onChange={onChangeInventory.bind(
                                      this,
                                      index
                                    )}
                                    inputProps={{ min: 0, step: "any" }}
                                    value={data?.installationcharges || 0}
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        name="status"
                                        size="small"
                                        checked={
                                          data?.status === undefined
                                            ? true
                                            : data?.status
                                        }
                                        onChange={onChangeInventory.bind(
                                          this,
                                          index
                                        )}
                                        color="primary"
                                      />
                                    }
                                    label="Status"
                                    labelPlacement="end"
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  {/* Attribute Section */}
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.sectionpaper}>
                      <Typography variant="h6" gutterBottom>
                        SKU Attributes
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        SKU selection attributes - Use attributes defined as
                        product variant attributes
                      </Typography>
                      <FilterAttributeComp
                        data={formControls?.attributes}
                        selectData={props?.product?.variantattributes}
                        onchangeAttribute={onChangeAttribute}
                        onAttributeAdd={onAttributeAdd}
                        onAttributeDelete={onAttributeDelete}
                      />
                      <Typography variant="subtitle2" gutterBottom>
                        Display Attributes are used for display alone - Use for
                        additional info
                      </Typography>
                      <SingleAttributeComp
                        data={formControls?.dattributes}
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
        </form>
      </Dialog>
      {/* Image upload component on click */}
      <ImageUploadComp
        open={openImageUpload}
        handleDialogClose={handleImageUploadClose}
        handleImageChange={handleImageChange}
        keyPath="sku/"
      />
      <ImageUploadComp
        open={openThumbnailUpload}
        handleDialogClose={handleThumbnailUploadClose}
        handleImageChange={handleThumbnailChange}
        keyPath="sku/"
      />
    </React.Fragment>
  );
}
