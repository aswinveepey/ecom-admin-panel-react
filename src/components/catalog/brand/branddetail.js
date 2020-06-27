import React from "react";
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
//styles - Material UI
// import { makeStyles } from "@material-ui/core/styles";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";

//define styles
// const useStyles = makeStyles((theme) => ({
//   addressitem: {
//     height: "100%",
//   },
// }));

export default function BrandDetailComp(props) {
  // const classes = useStyles();

  const token = Cookies.get("token");
  const [formControls, setFormControls] = React.useState([]);
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
      ? "brand/id/" + formControls._id
      : "brand/";
    //POST customer data and handle
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
  //change customer input handle
  const onchangeBrandInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls);
  };
  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
  }, [props]);

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
              <Grid item>
                <TextField
                  value={formControls?.name}
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
                  value={formControls?.manufacturer}
                  label="Manufacturer"
                  name="name"
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
    </React.Fragment>
  );
}
