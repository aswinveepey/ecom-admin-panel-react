import React, {Suspense} from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import ButtonBase from "@material-ui/core/ButtonBase";
//api import
import ProductService from "../../../services/product"
import CategoryService from "../../../services/category"
import BrandService from "../../../services/brand"
//Component import
const SkuIndexComp = React.lazy(() => import("./skuindex"));
const FilterAttributeComp = React.lazy(() =>
  import("../../common/filterattribute")
);
const MultiAttributeComp = React.lazy(() => import("../../common/multiattribute"));
const ImageUploadComp = React.lazy(() => import("../../common/imageupload"))


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
  button: {
    marginTop: "2%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const productService = new ProductService();
const categoryService = new CategoryService();
const brandService = new BrandService();

export default function ProductDetailComp(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [formControls, setFormControls] = React.useState([]);
  const [categorySearchString, setCategorySearchString] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState({});
  const [brandSearchString, setBrandSearchString] = React.useState("");
  const [brands, setBrands] = React.useState([]);
  const [openImageUpload, setOpenImageUpload] = React.useState(false);
  const [openThumbnailUpload, setOpenThumbnailUpload] = React.useState(false);

  //Change product name handling
  const onchangeProduct = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    
    let controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls);
  };
  //change product description
  const onchangeProductDescription = (index, event) => {
    event.preventDefault();
    // const name = event.target.name;
    const value = event.target.value;
    let controls = { ...formControls };
    controls.description = controls.description || [];
    controls.description[index] = {
      lang: "en",
      value: value,
    };
    setFormControls(controls);
  };
  const onaddProductDescription = (event) => {
    let controls = { ...formControls };
    controls.description = controls.description || [];
    controls.description.push({})
    setFormControls(controls);
  }
  //Change product storage handling
  const onchangeStorage = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    let controls = { ...formControls };
    controls.storage = controls.storage || {}
    controls.storage[name] = value;
    setFormControls(controls);
  };
  //Change product logistics handling
  const onchangeLogistics = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    let controls = { ...formControls };
    controls.logistics = controls.logistics || {};
    controls.logistics[name] = value;
    setFormControls(controls);
  };
  //Change product GST handling
  const onchangegst = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    let controls = { ...formControls };
    controls.gst = controls.gst || {};
    controls.gst[name] = value;
    setFormControls(controls);
  };
  //Change category search term
  const onChangeCategorySearch = (event) => {
    event.preventDefault();
    setCategorySearchString(event.target.value);
  };
  //change account input handle
  const onchangeCategoryInput = (event, value) => {
    event.preventDefault();
    let controls = { ...formControls };
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
    let controls = { ...formControls };
    controls.brand = value;
    setFormControls(controls);
  };
  //change attribute name handle
  const onchangeAttribute = (event, index) => {
    event.preventDefault();
    const {name, value} = event.target;

    let controls = { ...formControls };
    controls.attributes[index][name] = value;
    setFormControls(controls);
  };
  //add a new filter attribute
  const onAttributeAdd = (event)=>{
    event.preventDefault();
    let controls = { ...formControls };
    !controls.attributes && (controls.attributes=[])
    controls.attributes.push({ name: "", values: "" });
    setFormControls(controls);
  }
  //delete variant attribute
  const onAttributeDelete = (event, index)=>{
    event.preventDefault();
    let controls = { ...formControls };
    controls.attributes.splice(index,1);
    setFormControls(controls);
  }
  //change variant attribute name handle
  const onchangeVariantAttribute = (event, index) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    let controls = { ...formControls };
    controls.variantattributes[index][name] = value;
    setFormControls(controls);
  };
  //add a new variant attribute
  const onVariantAttributeAdd = (event)=>{
    event.preventDefault();
    let controls = { ...formControls };
    !controls.variantattributes && (controls.variantattributes=[])
    controls.variantattributes.push({ name: "", values: [] });
    setFormControls(controls);
  }
  //delete variant attribute
  const onVariantAttributeDelete = (event, index) => {
    event.preventDefault();
    let controls = { ...formControls };
    controls.variantattributes.splice(index, 1);
    setFormControls(controls);
  };
  //handle attribute value add
  const handleVariantAttrValueAdd = (index, chip)=>{
    let controls = { ...formControls };
    !controls.variantattributes[index].values &&
      (controls.variantattributes[index].values = []);
    controls.variantattributes[index].values.push(chip);
    setFormControls(controls);
  };
  const handleVariantAttrValueDelete = (index, attrIndex)=>{
    let controls = { ...formControls };
    controls.variantattributes[index].values.splice(attrIndex, 1);
    setFormControls(controls);
  }
  //Image upload handlers
  //handle image upload close
  const handleImageUploadClose =()=>{
    setOpenImageUpload(false);
  }
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
  //handle image change
  const handleImageChange = (image)=>{
    let controls = { ...formControls }
    controls.assets = controls.assets || {}
    !controls.assets.imgs && (controls.assets.imgs=[])
    controls.assets.imgs.push(image)
    setFormControls(controls);
  }
  //handle image change
  const handleThumbnailChange = (thumbnail) => {
    let controls = { ...formControls };
    controls.assets = controls.assets || {};
    controls.assets["thumbnail"] = thumbnail;
    setFormControls(controls);
  };
  //handle image deletion
  const deleteImage = (index)=>{
    let controls = { ...formControls }
    controls.assets.imgs.splice(index, 1)
    setFormControls(controls);
  }

  //delegate close behaviour to parent
  const handleClose = () => {
    props.handleClose();
  };
  //handle submit
  const handleSubmit = () => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if(formControls._id){
      productService
        .updateProduct(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    } else {
      productService
        .createProduct(signal, formControls)
        .then((data) => handleClose())
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  };

  //get open state from props
  React.useEffect(() => {
    setOpen(props.open);
    props.data && setFormControls(props.data);
  }, [props.data, props.open]);
  
  //get category from search string
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    categoryService
      .searchCategories(signal, categorySearchString)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [categorySearchString]);

  //get category data of selected category
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (formControls.category){
      categoryService
        .getOneSku({ signal: signal, categoryId: formControls.category?._id })
        .then((data) => setSelectedCategory(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [formControls.category]);

  //get brand from search string
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    brandService
      .searchBrands(signal, brandSearchString)
      .then((data) => setBrands(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [brandSearchString]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
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
                {formControls?.name || "Add Product"}
              </Typography>
              <Button color="inherit" type="submit">
                save changes
              </Button>
            </Toolbar>
          </AppBar>
          {/* End App Bar*/}
          {/* Wrap in outlined paper */}
          <Paper className={classes.gridpaper} variant="outlined">
            {/* Product Name */}
            <Grid container>
              {/* Images card display with add image */}
              <Grid item xs={12}>
                {/* section paper wrap */}
                <Paper className={classes.sectionpaper}>
                  {/* section title */}
                  <Typography variant="h6" gutterBottom>
                    Product Images
                  </Typography>
                  <Grid container spacing={1}>
                    {/* Add product grid */}
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
                          <CardHeader
                            subheader={"Product Image " + (index + 1)}
                          />
                          <CardContent className={classes.imagecardcontent}>
                            <img
                              src={img}
                              alt={"Product"}
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
                    <Grid item md={2} xs={6}>
                      {formControls?.assets?.thumbnail ? (
                        <Card variant="outlined">
                          <CardHeader subheader="Thumbnail" />
                          <CardContent className={classes.imagecardcontent}>
                            <img
                              src={formControls.assets.thumbnail}
                              className={classes.cardimage}
                              alt="product thumbnail"
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
                  {/* Product basic data section - Name, description, card & brand */}
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.sectionpaper}>
                      <Typography variant="h6" gutterBottom>
                        Product Details
                      </Typography>
                      {formControls?.shortid && (
                        <Typography gutterBottom>
                          # {formControls?.shortid}
                        </Typography>
                      )}
                      {/* Product Name text field */}
                      <TextField
                        label="Product Name"
                        variant="standard"
                        name="name"
                        fullWidth
                        required
                        onChange={onchangeProduct}
                        value={formControls?.name || ""}
                      />
                      {/* select category from search results */}
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
                            required
                            label="Category"
                            name="category"
                            variant="standard"
                            onChange={(event) => onChangeCategorySearch(event)}
                          />
                        )}
                      />
                      {/* select brand from  search result */}
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
                            required
                            name="brand"
                            variant="standard"
                            onChange={(event) => onChangeBrandSearch(event)}
                          />
                        )}
                      />
                      {/* Display descriptions - Supports multiple values */}
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={onaddProductDescription}
                        className={classes.button}
                      >
                        Add Description
                      </Button>
                      {formControls?.description?.map((description, index) => (
                        <TextField
                          label="Description"
                          multiline
                          rows={4}
                          fullWidth
                          name="description"
                          onChange={onchangeProductDescription.bind(
                            this,
                            index
                          )}
                          value={description.value || ""}
                          variant="standard"
                          key={index}
                        />
                      ))}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.sectionpaper}>
                      <Typography variant="h6">Product Attributes</Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Set values for category filter
                      </Typography>
                      <Suspense fallback={<div>Loading...</div>}>
                        <FilterAttributeComp
                          data={formControls.attributes}
                          selectData={selectedCategory}
                          // label="Attributes"
                          onchangeAttribute={onchangeAttribute}
                          onAttributeAdd={onAttributeAdd}
                          onAttributeDelete={onAttributeDelete}
                        />
                      </Suspense>
                      <Typography variant="h6">
                        SKU Filter Attributes
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        Set the attributes & values for sku selection
                      </Typography>
                      <Suspense fallback={<div>Loading...</div>}>
                        <MultiAttributeComp
                          data={formControls.variantattributes}
                          // label="FilterAttributes"
                          onchangeAttributeName={onchangeVariantAttribute}
                          onAttributeAdd={onVariantAttributeAdd}
                          onAttributeDelete={onVariantAttributeDelete}
                          handleAttrValueDelete={handleVariantAttrValueDelete}
                          handleAttrValueAdd={handleVariantAttrValueAdd}
                        />
                      </Suspense>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.sectionpaper}>
                      <Typography variant="h6" gutterBottom>
                        Storage & Logistics
                      </Typography>
                      {/* Product Name text field */}
                      <TextField
                        label="Storage Type"
                        variant="standard"
                        name="storagetype"
                        fullWidth
                        onChange={onchangeStorage}
                        value={formControls?.storage?.storagetype || ""}
                      />
                      <TextField
                        label="Shelf Life"
                        variant="standard"
                        name="shelflife"
                        fullWidth
                        onChange={onchangeStorage}
                        inputProps={{ min: 0 }}
                        value={formControls?.storage?.shelflife || ""}
                      />
                      <TextField
                        label="Deadweight"
                        variant="standard"
                        name="deadweight"
                        type="number"
                        fullWidth
                        onChange={onchangeLogistics}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.logistics?.deadweight || 0}
                      />
                      <TextField
                        label="Volumetric Weight"
                        variant="standard"
                        name="volumetricweight"
                        type="number"
                        fullWidth
                        onChange={onchangeLogistics}
                        inputProps={{ min: 0, step: "any" }}
                        value={formControls?.logistics?.volumetricweight || 0}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.sectionpaper}>
                      <Typography variant="h6" gutterBottom>
                        GST
                      </Typography>
                      <TextField
                        label="HSN Code"
                        variant="standard"
                        name="hsncode"
                        fullWidth
                        required
                        onChange={onchangegst}
                        value={formControls?.gst?.hsncode || ""}
                      />
                      <TextField
                        label="CGST"
                        variant="standard"
                        name="cgst"
                        type="number"
                        fullWidth
                        required
                        onChange={onchangegst}
                        inputProps={{ min: 0, max: 1, step: "any" }}
                        value={formControls?.gst?.cgst || 0}
                      />
                      <TextField
                        label="IGST"
                        variant="standard"
                        name="igst"
                        type="number"
                        fullWidth
                        required
                        onChange={onchangegst}
                        inputProps={{ min: 0, max: 1, step: "any" }}
                        value={formControls?.gst?.igst || 0}
                      />
                      <TextField
                        label="SGST"
                        variant="standard"
                        name="sgst"
                        type="number"
                        fullWidth
                        required
                        onChange={onchangegst}
                        inputProps={{ min: 0, max: 1, step: "any" }}
                        value={formControls?.gst?.sgst || 0}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {/* </Grid> */}
          {/* <Grid item className={classes.griditem} xs={12}> */}
          <Grid container direction="column" className={classes.colGrid}>
            <Grid item xs={12}>
              <Paper className={classes.gridpaper} variant="outlined">
                <Typography variant="subtitle1" gutterBottom component="div">
                  SKUs
                </Typography>
                <Suspense fallback={<div>Loading...</div>}>
                  <SkuIndexComp
                    data={formControls?.skus}
                    product={formControls}
                  />
                </Suspense>
              </Paper>
            </Grid>
          </Grid>
          {/* </Grid> */}
          {/* </Grid> */}
        </form>
      </Dialog>
      {/* Image upload component on click */}
      <Suspense fallback={<div>Loading...</div>}>
        <ImageUploadComp
          open={openImageUpload}
          handleDialogClose={handleImageUploadClose}
          handleImageChange={handleImageChange}
          keyPath="product/"
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageUploadComp
          open={openThumbnailUpload}
          handleDialogClose={handleThumbnailUploadClose}
          handleImageChange={handleThumbnailChange}
          keyPath="product/thumbnail/"
        />
      </Suspense>
    </React.Fragment>
  );
}
