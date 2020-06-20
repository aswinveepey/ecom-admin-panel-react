import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";

//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

export default function AccountDetailComp(props) {

  const token = Cookies.get("token");
  const [formControls, setFormControls] = React.useState([]);
  const [accountTypes, setAccountTypes] = React.useState([
    { value: "Corporate", label: "Corporate" },
    { value: "Enterprise", label: "Enterprise" },
    { value: "Other", label: "Other" },
  ]);

  const [addressTypes, setAddressTypes] = React.useState([
    { value: "Delivery", label: "Delivery" },
    { value: "Billing", label: "Billing" },
  ]);

  const onchangeAccountInput = (event) => {
    // console.log(event);
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls);
  };
  const onchangePrimaryContactInput = (event) => {
    // console.log(event);
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls.primarycontact = controls.primarycontact || {};
    controls.primarycontact[name] = value;
    setFormControls(controls);
  };

  React.useEffect(() => {
    setFormControls(props.data);
  }, [props]);

  const handleClose = () => {
    props.handleDialogClose();
  };
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
    //fetch data and set data
    const SUFFIX_URL = formControls._id?"account/id/"+formControls._id:"account/"
    fetch(BASE_URL + SUFFIX_URL, requestOptions, {
      signal: signal,
    })
      .then(async (data) => {
        const response = await data.json();
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

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="account-dialog"
      >
        <DialogTitle id="account-dialog-title">
          {formControls?.name}
        </DialogTitle>
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogContent>
            {/* <DialogContentText>Form Comes here</DialogContentText> */}
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  value={formControls?.name}
                  label="Name"
                  name="name"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeAccountInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  value={formControls?.type || ""}
                  label="type"
                  name="type"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeAccountInput(event)}
                >
                  {accountTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.primarycontact?.name || ""}
                  label="Primary Contact"
                  name="name"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangePrimaryContactInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.primarycontact?.email || ""}
                  label="Email"
                  name="email"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangePrimaryContactInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.primarycontact?.mobile || ""}
                  label="Mobile"
                  name="mobile"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangePrimaryContactInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.primarycontact?.designation || ""}
                  label="Designation"
                  name="designation"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangePrimaryContactInput(event)}
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
    </div>
  );
}
