import React from "react"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   "& > *": {
  //     margin: theme.spacing(1),
  //   },
  // },
  input: {
    display: "none",
  },
}));

export default function ImageUploadComp(props){
  const classes = useStyles();
  const[loader, setLoader] = React.useState()
  const [image, setImage] = React.useState();
  const [uploadUrl, setUploadUrl] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const token = Cookies.get("token");

  //handle close to props
  const handleClose = () => {
    props.handleDialogClose();
  };

  //upload image to api & get url
  const handleImageUpload = (event) => {
    setLoader(true);
    const file = event.target.files[0]
    file && setImage(file);
  };

  //get signed s3 url for file upload
  React.useEffect(()=>{
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ Key: "category/"+image?.name, ContentType: image?.type }),
    };
    //generate put url from api
    image &&
      fetch(BASE_URL + "asset/generatePutUrl", requestOptions, {
        signal: signal,
      })
        .then(async (data) => {
          const response = await data.json();
          const { status } = data;
          status === 200 && setUploadUrl(response.data);
        })
        .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  },[image, token])

  //upload Image to S3 Bucket using put url and set image url
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "PUT",
      params: {
        Key: "category/" + image?.name,
        ContentType: image?.type,
      },
      headers: {
        "content-type": image?.type,
      },
      body: image,
    };
    uploadUrl &&
      fetch(uploadUrl, requestOptions, { signal: signal })
        .then(async (data) => {
          const { status } = data;
          status === 200 && setImageUrl(data.url.split("?")[0]);
        })
        .then(() => setLoader(false))
        .catch((err) => console.log(err));
      return function cleanup() {
        abortController.abort();
      };
  }, [uploadUrl, image]);

  //handle submit pass url to parent
  const handleSubmit = (event) => {
    event.preventDefault();
    imageUrl && props.handleImageChange(imageUrl)
    props.handleDialogClose();
    //pass image url back to parent component
  }

  //return component
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"sm"}
      aria-labelledby="image-upload-dialog"
    >
      <DialogTitle id="image-upload-dialog-title">Upload Image</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            name="image"
            multiple
            type="file"
            onChange={handleImageUpload}
          />
          {loader ? (
            <CircularProgress />
          ) : (
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                {image ? "Replace Image" : "Select Image"}
              </Button>
            </label>
          )}
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
  );
}