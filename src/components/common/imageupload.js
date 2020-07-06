import React from "react"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DropzoneArea } from "material-ui-dropzone";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress"
// import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //   "& > *": {
//   //     margin: theme.spacing(1),
//   //   },
//   // },
//   input: {
//     display: "none",
//   },
// }));

export default function ImageUploadComp(props){
  // const classes = useStyles();
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
  const handleImageUpload = (file) => {
    // const file = event.target.files[0]
    file[0] && setImage(file[0]);
  };

  //get signed s3 url for file upload
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        Key: props.keyPath + image?.name,
        ContentType: image?.type,
      }),
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
  }, [image, token, props.keyPath]);

  //upload Image to S3 Bucket using put url and set image url
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "PUT",
      params: {
        Key: props.keyPath + image?.name,
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
  }, [uploadUrl, image, props.keyPath]);

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
        <DialogContent>
          <DropzoneArea
            open={true}
            onChange={handleImageUpload}
            filesLimit={1}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Upload Image
          </Button>
        </DialogActions>
    </Dialog>
  );
}