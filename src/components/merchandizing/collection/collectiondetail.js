import React from "react";
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
import ImageUploadComp from "../../common/imageupload";
import MenuItem from "@material-ui/core/MenuItem";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";
// date picker
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
//api import
import CollectionService from "../../../services/collection";
// import CategoryService from "../../../services/category";
// import SKUService from "../../../services/sku";

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

export default function DivisionDetailComp(props) {
  const classes = useStyles();

  const [formControls, setFormControls] = React.useState([]);
  // const [categorySearchString, setCategorySearchString] = React.useState("");
  // const [categories, setCategories] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);
  const [openThumbnailUpload, setOpenThumbnailUpload] = React.useState(false);
  const [typeOptions, setTypeOptions] = React.useState([
    { value: "Category", label: "Category" },
    { value: "Sku", label: "Sku" },
  ]);
  //handle dialog close - call div index comp
  const handleClose = () => {
    props.handleDialogClose();
  };
  //handle image upload close
  const handleImageUploadClose = () => {
    setOpenImageUpload(false);
  };
  //new image upload
  function handleImageUploadClick() {
    setOpenImageUpload(true);
  }
  //handle image upload close
  const handleThumbnailUploadClose = () => {
    setOpenThumbnailUpload(false);
  };
  //new image upload
  function handleThumbnailUploadClick() {
    setOpenThumbnailUpload(true);
  }
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

  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
  }, [props]);
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
                            onClick={handleImageUploadClick}
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
                          onClick={handleImageUploadClick}
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
      <ImageUploadComp
        open={openImageUpload}
        handleDialogClose={handleImageUploadClose}
        handleImageChange={handleImageChange}
        keyPath="division/"
      />
      <ImageUploadComp
        open={openThumbnailUpload}
        handleDialogClose={handleThumbnailUploadClose}
        handleImageChange={handleThumbnailChange}
        keyPath="division/thumbnail/"
      />
    </React.Fragment>
  );
}
