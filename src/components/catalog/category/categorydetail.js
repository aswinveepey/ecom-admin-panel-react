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
import MultiAttributeComp from "../../common/multiattribute";
import ImageUploadComp from "../../common/imageupload"
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";

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

export default function CategoryDetailComp(props) {
  const classes = useStyles();

  const token = Cookies.get("token");
  const [formControls, setFormControls] = React.useState([]);
  const [parentSearchString, setParentSearchString] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);
  const [openThumbnailUpload, setOpenThumbnailUpload] = React.useState(false);
  //handle dialog close - call parent function
  const handleClose = () => {
    props.handleDialogClose();
  };
  //handle image upload close
  const handleImageUploadClose =()=>{
    setOpenImageUpload(false);
  }
  //new image upload
  function handleImageUploadClick() {
    setOpenImageUpload(true);
  }
  //handle image upload close
  const handleThumbnailUploadClose =()=>{
    setOpenThumbnailUpload(false);
  }
  //new image upload
  function handleThumbnailUploadClick() {
    setOpenThumbnailUpload(true);
  }
  // handle category form submit
  const handleSubmit = (event) => {
    event.preventDefault();
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
      ? "category/id/" + formControls._id
      : "category/";
    //POST category data and handle
    fetch(BASE_URL + SUFFIX_URL, requestOptions, {
      signal: signal,
    })
      .then(async (data) => {
        // const response = await data.json();
        const { status } = data;
        if (status === 200 || status === 201) {
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err)
      });
    return function cleanup() {
      abortController.abort();
    };
  };
  //change category input handle
  const onchangeCategoryInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls);
  };

  //change account input handle
  const onchangeParentInput = (event, value) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.parent = value;
    setFormControls(controls);
  };
  //change filter attribute name handle
  const onchangeFilterAttributeName = (event, index) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.filterattributes[index][name] = value;
    setFormControls(controls);
  };
  //add a new filter attribute
  const onFilterAttributeAdd = (event) => {
    event.preventDefault();
    const controls = { ...formControls };
    !controls.filterattributes && (controls.filterattributes = []);
    controls.filterattributes.push({ name: "", values: [] });
    setFormControls(controls);
  };
  //delete filter attribute
  const onFilterAttributeDelete = (event, index) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.filterattributes.splice(index, 1);
    setFormControls(controls);
  };
  //handle attribute value add
  const handleAttrValueAdd = (index, chip)=>{
    const controls = { ...formControls };
    !controls.filterattributes[index].values &&
      (controls.filterattributes[index].values = []);
    controls.filterattributes[index].values.push(chip);
    setFormControls(controls);
  };
  const handleAttrValueDelete = (index, attrIndex)=>{
    const controls = { ...formControls };
    controls.filterattributes[index].values.splice(attrIndex, 1);
    setFormControls(controls);
  }
  //Change search term - Account
  const onChangeParentSearch = (event) => {
    event.preventDefault();
    setParentSearchString(event.target.value);
  };
  //handle image change
  const handleImageChange = (image)=>{
    const controls = { ...formControls }
    controls.assets = controls.assets || {};
    controls.assets["img"] = image;
    setFormControls(controls);
  }
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
    //set request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ searchString: parentSearchString }),
    };
    //fetch data and set data
    if (parentSearchString.length > 2) {
      fetch(BASE_URL + "category/search", requestOptions, { signal: signal })
        .then(async (data) => {
          const response = await data.json();
          const { status } = data;
          status === 200 && setCategories(response.data);
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [parentSearchString, token]);

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="category-dialog"
      >
        <DialogTitle id="category-dialog-title">
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
                            alt="category"
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
                            alt="category thumbnail"
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
                  value={formControls?.name}
                  label="Category Name"
                  name="name"
                  variant="standard"
                  required
                  fullWidth
                  onChange={(event) => onchangeCategoryInput(event)}
                />
              </Grid>
              {/* Parent select */}
              <Grid item>
                <Autocomplete
                  options={categories}
                  freeSolo
                  value={formControls.parent || ""}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.name
                  }
                  getOptionSelected={(option, value) =>
                    option ? option.name === value.name : false
                  }
                  onChange={(event, value) => onchangeParentInput(event, value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Parent Category"
                      name="parent"
                      variant="standard"
                      fullWidth
                      onChange={(event) => onChangeParentSearch(event)}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                {/* filterattributes */}
                <MultiAttributeComp
                  data={formControls.filterattributes}
                  label="FilterAttributes"
                  onchangeAttributeName={onchangeFilterAttributeName}
                  onAttributeAdd={onFilterAttributeAdd}
                  onAttributeDelete={onFilterAttributeDelete}
                  handleAttrValueDelete={handleAttrValueDelete}
                  handleAttrValueAdd={handleAttrValueAdd}
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
        keyPath="category/"
      />
      <ImageUploadComp
        open={openThumbnailUpload}
        handleDialogClose={handleThumbnailUploadClose}
        handleImageChange={handleThumbnailChange}
        keyPath="category/thumbnail/"
      />
    </React.Fragment>
  );
}