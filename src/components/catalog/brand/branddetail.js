import React, {Suspense} from "react";
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Fab from "@material-ui/core/Fab";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";
//api import
import BrandService from "../../../services/brand"

const ImageUploadComp = React.lazy(()=>import("../../common/imageupload"))

// define styles
const useStyles = makeStyles((theme) => ({
  img: {
    height: "200px",
    width: "200px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function BrandDetailComp(props) {
  const classes = useStyles();
  const brandService = new BrandService()
  
  const [formControls, setFormControls] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);


  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
  }, [props.data]);
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
  //handle image change
  const handleImageChange = (image)=>{
    const controls = { ...formControls }
    controls.assets= controls.assets || {}
    controls.assets["logo"] = image;
    setFormControls(controls);
  }
  //change customer input handle
  const onchangeBrandInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls);
  };
  // handle dialog form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if(formControls._id){
      brandService
        .updateBrand(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    } else {
      brandService
        .createBrand(signal, formControls)
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
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="brand-dialog"
      >
        <DialogTitle id="brand-dialog-title">
          {formControls.name || ""}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container direction="column" spacing={1}>
              {formControls.assets && (
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <img
                        src={formControls.assets.logo}
                        className={classes.img}
                        alt="category"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Fab size="small" onClick={handleImageUploadClick}>
                  <PhotoCamera />
                </Fab>
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
                  label="Brand Name"
                  name="name"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeBrandInput(event)}
                />
              </Grid>
              {/* Manufacturer */}
              <Grid item>
                <TextField
                  value={formControls?.manufacturer || ""}
                  label="Manufacturer"
                  name="manufacturer"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeBrandInput(event)}
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
      <Suspense fallback={<div>Loading...</div>}>
        <ImageUploadComp
          open={openImageUpload}
          handleDialogClose={handleImageUploadClose}
          handleImageChange={handleImageChange}
          keyPath="brand/"
        />
      </Suspense>
    </React.Fragment>
  );
}
