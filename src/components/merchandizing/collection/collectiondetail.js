import React, { Suspense } from "react";
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";
// date picker
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
//api import
import CollectionService from "../../../services/collection";
// import CategoryService from "../../../services/category";
// import SKUService from "../../../services/sku";

const SelectSKU = React.lazy(() => import("../../common/selectsku"));
const SelectCategory = React.lazy(() => import("../../common/selectcategory"));
const ImageUploadComp = React.lazy(() => import("../../common/imageupload"));
// define styles
const useStyles = makeStyles((theme) => ({
  img: {
    height: "200px",
    width: "200px",
  },
  thumbnail: {
    height: "50px",
    width: "50px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
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
  cardthumbnail: {
    maxHeight: "50px",
    maxWidth: "50px",
    height: "auto",
    width: "auto",
  },
  thumbnailcardcontent: {
    display: "block",
    minHeight: "50px",
    minWidth: "50px",
    // width: "100px",
    // flexGrow: 1,
  },
}));

const collectionService = new CollectionService();
// const categoryService = new CategoryService();

export default function CollectionDetailComp(props) {
  const classes = useStyles();

  const [formControls, setFormControls] = React.useState([]);
  // const [categorySearchString, setCategorySearchString] = React.useState("");
  // const [categories, setCategories] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);
  const [openThumbnailUpload, setOpenThumbnailUpload] = React.useState(false);
  const [addSkuOpen, setAddSkuOpen] = React.useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = React.useState(false);
  const [typeOptions, setTypeOptions] = React.useState([]);
  //handle dialog close - call div index comp
  const handleClose = () => {
    props.handleDialogClose();
  };
  //handle image upload close
  const handleImageUploadToggle = () => {
    setOpenImageUpload(!openImageUpload);
  };

  //handle image upload close
  const handleThumbnailUploadToggle = () => {
    setOpenThumbnailUpload(!openThumbnailUpload);
  };

  //add sku handling in case of new order
  const toggleAddItem = () => {
    if(formControls?.type==="Category"){
      setAddCategoryOpen(!addCategoryOpen);
    } else {
      setAddSkuOpen(!addSkuOpen);
    }
  };
  //change division input handle
  const onchangeCollectionInput = (event) => {
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
  const handleAddItem = (item)=>{
    const controls = { ...formControls };
    controls.items = controls.items || [];
    controls.items.push(item._id);
    setFormControls(controls);
  }
  const handleRemoveitem = (index) => {
    const controls = { ...formControls };
    controls.items.splice(index, 1);
    setFormControls(controls);
  };
  const setCollectionStartDate = (date) => {
    const controls = { ...formControls };
    controls["startdate"] = date;
    setFormControls(controls);
  };
  const setCollectionEndDate = (date) => {
    const controls = { ...formControls };
    controls["enddate"] = date;
    setFormControls(controls);
  };
  //change account input handle
  // const onchangeCategoryInput = (event, value) => {
  //   event.preventDefault();
  //   const controls = { ...formControls };
  //   controls.categories = value;
  //   setFormControls(controls);
  // };
  //Change search term - Account
  // const onChangeCategorySearch = (event) => {
  //   event.preventDefault();
  //   const value = event.target.value;
  //   setCategorySearchString(value);
  // };
  //handle image change
  const handleImageChange = (image) => {
    const controls = { ...formControls };
    controls.assets = controls.assets || {};
    controls.assets["img"] = image;
    setFormControls(controls);
  };
  //handle image change
  const handleThumbnailChange = (thumbnail) => {
    const controls = { ...formControls };
    controls.assets = controls.assets || {};
    controls.assets["thumbnail"] = thumbnail;
    setFormControls(controls);
  };

  // handle division form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (formControls._id) {
      collectionService
        .updateCollection(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    } else {
      collectionService
        .createCollection(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  };

  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
    setTypeOptions([
      { value: "Category", label: "Category" },
      { value: "Sku", label: "Sku" },
    ]);
  }, [props.data]);
  //get category from search string
  // React.useEffect(() => {
  //   //clean up subscriptions using abortcontroller & signals
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;
  //   categoryService
  //     .getCategories(signal, categorySearchString)
  //     .then((data) => setCategories(data))
  //     .catch((err) => console.log(err));
  //   return function cleanup() {
  //     abortController.abort();
  //   };
  // }, [categorySearchString]);

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="division-dialog"
      >
        <DialogTitle id="division-dialog-title">
          {formControls.name || ""}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    {formControls?.assets?.img ? (
                      <Card variant="outlined">
                        <CardHeader title="Image" />
                        <CardContent className={classes.imagecardcontent}>
                          <img
                            src={formControls.assets.img}
                            className={classes.img}
                            alt="division"
                          />
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={handleImageUploadToggle}
                          >
                            Replace
                          </Button>
                        </CardActions>
                      </Card>
                    ) : (
                      <Card variant="outlined">
                        {/* Button base covers card content to make whole card clickable */}
                        <ButtonBase
                          className={classes.addimgbase}
                          onClick={handleImageUploadToggle}
                        >
                          <CardContent className={classes.imagecardcontent}>
                            <PhotoCamera />
                            <Typography>Add Image</Typography>
                          </CardContent>
                        </ButtonBase>
                        <CardActions></CardActions>
                      </Card>
                    )}
                  </Grid>
                  <Grid item>
                    {formControls?.assets?.thumbnail ? (
                      <Card variant="outlined">
                        <CardHeader title="Thumbnail" />
                        <CardContent className={classes.thumbnailcardcontent}>
                          <img
                            src={formControls.assets.thumbnail}
                            className={classes.thumbnail}
                            alt="collection thumbnail"
                          />
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            color="secondary"
                            onClick={handleThumbnailUploadToggle}
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
                          onClick={handleThumbnailUploadToggle}
                        >
                          <CardContent className={classes.thumbnailcardcontent}>
                            <PhotoCamera />
                            <Typography>Add Thumbnail</Typography>
                          </CardContent>
                        </ButtonBase>
                        <CardActions></CardActions>
                      </Card>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {formControls._id && (
                <Grid item>
                  <TextField
                    value={formControls?.shortid}
                    label="ID"
                    disabled={true}
                    name="shortid"
                    variant="standard"
                    fullWidth
                  />
                </Grid>
              )}
              <Grid item>
                <TextField
                  value={formControls?.name || ""}
                  label="Collection Name"
                  name="name"
                  variant="standard"
                  required
                  fullWidth
                  onChange={(event) => onchangeCollectionInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  value={formControls?.type || ""}
                  label="Type"
                  name="type"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCollectionInput(event)}
                >
                  {typeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid item>
                  <DateTimePicker
                    inputVariant="standard"
                    variant="inline"
                    label="Start Date"
                    name="startdate"
                    fullWidth
                    value={formControls?.startdate}
                    onChange={setCollectionStartDate}
                  />
                </Grid>
                <Grid item>
                  <DateTimePicker
                    inputVariant="standard"
                    variant="inline"
                    label="End Date"
                    name="enddate"
                    fullWidth
                    value={formControls?.enddate}
                    onChange={setCollectionEndDate}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item>
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
                      onChange={onchangeCollectionInput}
                      color="primary"
                    />
                  }
                  label="Collection status"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="outlined"
                  aria-label="add"
                  className={classes.button}
                  onClick={toggleAddItem}
                >
                  Add Items
                </Button>
              </Grid>
              <Grid item>
                {formControls.items?.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={handleRemoveitem.bind(this, index)}
                  />
                ))}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Suspense fallback={<div>Loading...</div>}>
        <SelectSKU
          open={addSkuOpen}
          handleClose={toggleAddItem}
          selectSku={handleAddItem}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <SelectCategory
          open={addCategoryOpen}
          handleClose={toggleAddItem}
          selectCategory={handleAddItem}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageUploadComp
          open={openImageUpload}
          handleDialogClose={handleImageUploadToggle}
          handleImageChange={handleImageChange}
          keyPath="collection/"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageUploadComp
          open={openThumbnailUpload}
          handleDialogClose={handleThumbnailUploadToggle}
          handleImageChange={handleThumbnailChange}
          keyPath="collection/thumbnail/"
        />
      </Suspense>
    </React.Fragment>
  );
}
