import React from "react";
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ImageUploadComp from "../../common/imageupload";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";
//api import
import DivisionApi from "../../../api/division"
import CategoryApi from "../../../api/category"

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

const divisionApi = new DivisionApi();
const categoryApi = new CategoryApi();

export default function DivisionDetailComp(props) {
  const classes = useStyles();

  const [formControls, setFormControls] = React.useState([]);
  const [categorySearchString, setCategorySearchString] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);
  const [openThumbnailUpload, setOpenThumbnailUpload] = React.useState(false);
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
    if(formControls._id){
      divisionApi
        .updateDivision(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    } else {
      divisionApi
        .createDivision(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  };
  //change division input handle
  const onchangeDivisionInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls);
  };
  //change account input handle
  const onchangeCategoryInput = (event, value) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.categories = value;
    setFormControls(controls);
  };
  //Change search term - Account
  const onChangeCategorySearch = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setCategorySearchString(value);
  };
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
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    categoryApi
      .searchCategories(signal, categorySearchString)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [categorySearchString]);

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
                            alt="division thumbnail"
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
                    value={formControls?._id}
                    label="ID"
                    disabled={true}
                    name="_id"
                    variant="standard"
                    fullWidth
                    // onChange={(event) => onchangeCategoryInput(event)}
                  />
                </Grid>
              )}
              <Grid item>
                <TextField
                  value={formControls?.name || ""}
                  label="Division Name"
                  name="name"
                  variant="standard"
                  required
                  fullWidth
                  onChange={(event) => onchangeDivisionInput(event)}
                />
              </Grid>
              {/* Category select */}
              <Grid item>
                <Autocomplete
                  freeSolo
                  multiple
                  options={categories}
                  value={formControls.categories?.map((data) => data) || []}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.name
                  }
                  getOptionSelected={(option, value) =>
                    option ? option.name === value.name : false
                  }
                  name="categories"
                  onChange={(event, value) =>
                    onchangeCategoryInput(event, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categories"
                      variant="standard"
                      name="categories"
                      fullWidth
                      onChange={onChangeCategorySearch}
                    />
                  )}
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
