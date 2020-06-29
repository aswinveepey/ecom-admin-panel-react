import React from "react"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
  const handleClose = () => {
    props.handleDialogClose();
  };
  //handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    //pass src data back to parent
  }
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
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Select Image
            </Button>
          </label>
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