import React from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ButtonBase from "@material-ui/core/ButtonBase";
import Cookies from "js-cookie";
import SkuIndexComp from "./skuindex";
import { BASE_URL } from "../../../constants";

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
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    overflow: "scroll",
  },
  cardimage: {
    maxHeight: "100px",
    maxWidth: "100px",
    height: "auto",
    width: "auto",
  },
  imagecard: {
    display: "block",
    height: "100px",
    // width: "100px",
    flexGrow: 1,
  },
  colGrid: {
    width: "100%",
    overflow: "scroll",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductDetailComp(props) {
  const classes = useStyles();
  const token = Cookies.get("token");

  const [open, setOpen] = React.useState(false);
  const [formControls, setFormControls] = React.useState([]);
  const [categorySearchString, setCategorySearchString] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [brandSearchString, setBrandSearchString] = React.useState([]);
  const [brands, setBrands] = React.useState([]);

  //Change category search term
  const onChangeCategorySearch = (event) => {
    event.preventDefault();
    setCategorySearchString(event.target.value);
  };
  //change account input handle
  const onchangeCategoryInput = (event, value) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.category = value;
    setFormControls(controls);
  };
  //Change category search term
  const onChangeBrandSearch = (event) => {
    event.preventDefault();
    setBrandSearchString(event.target.value);
  };
  //change account input handle
  const onchangeBrandInput = (event, value) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.brand = value;
    setFormControls(controls);
  };
  React.useEffect(()=>{
    props.data && setFormControls(props.data)
  },[props])

  //get open state from props
  React.useEffect(() => {
    setOpen(props.open);
  }, [props]);

  //delegate close behaviour to parent
  const handleClose = () => {
    props.handleClose();
  };
  
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
      body: JSON.stringify({ searchString: categorySearchString }),
    };
    //fetch data and set data
    if (categorySearchString.length > 2) {
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
  }, [categorySearchString, token]);

  //get brand from search string
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
      body: JSON.stringify({ searchString: brandSearchString }),
    };
    //fetch data and set data
    if (brandSearchString.length > 2) {
      fetch(BASE_URL + "brand/search", requestOptions, { signal: signal })
        .then(async (data) => {
          const response = await data.json();
          const { status } = data;
          status === 200 && setBrands(response.data);
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [brandSearchString, token]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
              Product Detail
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container className={classes.gridcontainer}>
          <Grid item md={6} xs={12} className={classes.griditem}>
            <Grid container direction="column">
              <Paper className={classes.gridpaper} variant="outlined">
                <Typography variant="h6" gutterBottom>
                  {formControls?.name}
                </Typography>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item md={3} xs={6}>
                      <Card variant="outlined">
                        <ButtonBase>
                          <CardContent className={classes.imagecard}>
                            <PhotoCamera />
                            <Typography>Add Image</Typography>
                          </CardContent>
                        </ButtonBase>
                        <CardActions></CardActions>
                      </Card>
                    </Grid>
                    {formControls?.assets?.imgs?.map((img, index) => (
                      <Grid item md={3} xs={6} key={index}>
                        <Card variant="outlined">
                          <CardContent className={classes.imagecard}>
                            <img
                              src={img}
                              alt={"Product"}
                              className={classes.cardimage}
                            />
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="secondary">
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
                </Grid>
                <Grid item sm>
                  {formControls?.shortid && (
                    <Typography gutterBottom>
                      # {formControls?.shortid}
                    </Typography>
                  )}
                  <TextField
                    label="Product Name"
                    variant="standard"
                    fullWidth
                    value={formControls?.name || ""}
                  />
                  <Autocomplete
                    options={categories}
                    freeSolo
                    value={formControls.category || ""}
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.name
                    }
                    getOptionSelected={(option, value) =>
                      option ? option.name === value.name : false
                    }
                    onChange={(event, value) =>
                      onchangeCategoryInput(event, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        name="category"
                        variant="standard"
                        onChange={(event) => onChangeCategorySearch(event)}
                      />
                    )}
                  />
                  <Autocomplete
                    options={brands}
                    freeSolo
                    value={formControls.brand || ""}
                    getOptionLabel={(option) =>
                      typeof option === "string" ? option : option.name
                    }
                    getOptionSelected={(option, value) =>
                      option ? option.name === value.name : false
                    }
                    onChange={(event, value) =>
                      onchangeBrandInput(event, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brand"
                        name="brand"
                        variant="standard"
                        onChange={(event) => onChangeBrandSearch(event)}
                      />
                    )}
                  />
                  {formControls?.description?.map((description, index) => (
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                      name="description"
                      value={description.value || ""}
                      variant="standard"
                      key={index}
                    />
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12} className={classes.griditem}>
            <Grid container direction="column" className={classes.colGrid}>
              <Grid item>
                <Paper className={classes.gridpaper} variant="outlined">
                  <Typography variant="subtitle1" gutterBottom component="div">
                    SKUs
                  </Typography>
                  {formControls.skus && (
                    <SkuIndexComp data={formControls.skus} />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
