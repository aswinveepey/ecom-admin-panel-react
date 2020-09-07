import React from "react";
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
//styles - Material UI
// import { makeStyles } from "@material-ui/core/styles";
// date picker

import LeadService from "../../../services/lead";
import AccountService from "../../../services/account";

const leadService = new LeadService();
const accountService = new AccountService();

export default function LeadDetailComp(props) {
  // const classes = useStyles();

  const [formControls, setFormControls] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [accountSearchString, setAccountSearchString] = React.useState("");
  const [leadTypes, setLeadTypes] = React.useState([
    { value: "Regular", label: "Regular" },
    { value: "Business", label: "Business" },
  ]);
  const [sources, setSources] = React.useState([
    { value: "walkin", label: "Walkin" },
    { value: "walkin", label: "Website" },
  ]);
  const [scores, setScores] = React.useState([
    { value: "hot", label: "Hot" },
    { value: "warm", label: "Warm" },
    { value: "cold", label: "Cold" },
  ]);
  //handle dialog close - call parent function
  const handleClose = () => {
    props.handleDialogClose();
  };
  // handle dialog form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (formControls._id) {
      leadService
        .updateLead(signal, formControls)
        .then((data) => {
          // console.log(data);
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      leadService
        .createLead(signal, formControls)
        .then((data) => {
          console.log(data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  };

  //change lead input handle
  const onchangeLeadInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls);
  };

  //change account input handle
  const onchangeLeadAccountInput = (event, value) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.account = value;
    setFormControls(controls);
  };
  //Change search term - Account
  const onChangeAccountSearch = (event) => {
    event.preventDefault();
    setAccountSearchString(event.target.value);
  };

  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
  }, [props.data]);
  //get account from search string
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    accountService
      .searchAccounts(signal, accountSearchString)
      .then((data) => setAccounts(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [accountSearchString]);

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="lead-detail-dialog"
      >
        <DialogTitle id="lead-dialog-title">
          {formControls.firstname &&
            formControls?.firstname + " " + formControls?.lastname}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* <DialogContentText>Form Comes here</DialogContentText> */}
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  value={formControls?.firstname}
                  label="First Name"
                  name="firstname"
                  variant="standard"
                  required
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.lastname}
                  label="Last Name"
                  name="lastname"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.mobile || ""}
                  label="Mobile"
                  name="mobile"
                  variant="standard"
                  required
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.gst || ""}
                  label="GST"
                  name="gst"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  multiline
                  value={formControls?.address || ""}
                  label="Address"
                  name="address"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  value={formControls?.type || ""}
                  label="type"
                  name="type"
                  variant="standard"
                  required
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                >
                  {leadTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  select
                  value={formControls?.source || ""}
                  label="Source"
                  name="source"
                  required
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                >
                  {sources.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  select
                  value={formControls?.score || ""}
                  label="Score"
                  name="score"
                  required
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeLeadInput(event)}
                >
                  {scores.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* Account select */}
              <Grid item>
                <Autocomplete
                  options={accounts}
                  freeSolo
                  value={formControls.account || ""}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.name
                  }
                  getOptionSelected={(option, value) =>
                    option ? option.name === value.name : false
                  }
                  onChange={(event, value) =>
                    onchangeLeadAccountInput(event, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Account"
                      name="account"
                      variant="standard"
                      fullWidth
                      onChange={(event) => onChangeAccountSearch(event)}
                    />
                  )}
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
