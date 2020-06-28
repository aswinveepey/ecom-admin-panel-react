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
import Fab from "@material-ui/core/Fab"
import MultiAttributeComp from "../../common/attribute";
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
}));

export default function CategoryDetailComp(props) {
  const classes = useStyles();

  const token = Cookies.get("token");
  const [formControls, setFormControls] = React.useState([]);
  const [parentSearchString, setParentSearchString] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  //handle dialog close - call parent function
  const handleClose = () => {
    props.handleDialogClose();
  };
  // handle dialog form submit
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
        if (status === 200) {
          handleClose();
        }
      })
      .catch((err) => console.log(err));
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
  //change account input handle
  const onchangeFilterAttributeName = (event, index) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.filterattributes[index][name] = value;
    setFormControls(controls);
  };
  //Change search term - Account
  const onChangeParentSearch = (event) => {
    event.preventDefault();
    setParentSearchString(event.target.value);
  };
  //add a new filter attribute
  const onAttributeAdd = (event)=>{
    event.preventDefault();
    const controls = { ...formControls };
    !controls.filterattributes && (controls.filterattributes=[])
    controls.filterattributes.push({ name: "", values: [] });
    setFormControls(controls);
  }
  //deletefilter attribute
  const onAttributeDelete = (event, index)=>{
    event.preventDefault();
    const controls = { ...formControls };
    controls.filterattributes.splice(index,1);
    setFormControls(controls);
  }
  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
  }, [props]);
  //get account from search string
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
              {formControls.assets && (
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <img
                        src={formControls.assets.img}
                        className={classes.img}
                        alt="category"
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={formControls.assets.thumbnail}
                        className={classes.thumbnail}
                        alt="category"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Fab  size="small">
                  <PhotoCamera/>
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
                  onAttributeAdd={onAttributeAdd}
                  onAttributeDelete={onAttributeDelete}
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
    </React.Fragment>
  );
}