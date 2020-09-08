import React from "react";
//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";

//Component import
//api import
import LeadService from "../../../services/lead";
import AccountService from "../../../services/account";
import UserService from "../../../services/user";

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
    elevation:0
  },
  colGrid: {
    width: "100%",
  },
  // dialog: {
  //   minHeight: "90vh",
  //   maxHeight: "90vh",
  //   marginTop:"auto",
  //   marginLeft:"auto",
  // },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const leadService = new LeadService();
const accountService = new AccountService();
const userService = new UserService();

export default function SkuDetailComp(props) {
  const classes = useStyles();
  const [formControls, setFormControls] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [accountSearchString, setAccountSearchString] = React.useState("");
  const [userSearchString, setUserSearchString] = React.useState("");
  const [leadTypes, setLeadTypes] = React.useState([]);
  const [sources, setSources] = React.useState([]);
  const [scores, setScores] = React.useState();

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

  //change account input handle
  const onchangeLeadOwnerInput = (event, value) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.owner = value;
    setFormControls(controls);
  };
  //Change search term - Account
  const onChangeLeadOwnerSearch = (event) => {
    event.preventDefault();
    setUserSearchString(event.target.value);
  };

  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
    setLeadTypes([
      { value: "Regular", label: "Regular" },
      { value: "Business", label: "Business" },
    ]);
    setSources([
      { value: "walkin", label: "Walkin" },
      { value: "walkin", label: "Website" },
    ]);
    setScores([
      { value: "hot", label: "Hot" },
      { value: "warm", label: "Warm" },
      { value: "cold", label: "Cold" },
    ]);
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

  //get account from search string
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    userService
      .searchUsers(signal, userSearchString)
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [userSearchString]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        className={classes.dialog}
        open={props.open}
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
                {"Update Lead" || "Add Lead"}
              </Typography>
              <Button color="inherit" type="submit">
                save changes
              </Button>
            </Toolbar>
          </AppBar>
          {/* End App Bar*/}
          {/* Wrap in outlined paper */}
          <Paper className={classes.gridpaper} variant="outlined">
            <Grid container>
              {/* Lead Details */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper className={classes.sectionpaper} variant="outlined">
                      <Typography variant="h6" gutterBottom>
                        Lead Details
                      </Typography>
                      {formControls?.shortid && (
                        <Typography gutterBottom>
                          # {formControls?.shortid}
                        </Typography>
                      )}
                      {/* Product Name text field */}
                      <TextField
                        value={formControls?.firstname}
                        label="First Name"
                        name="firstname"
                        variant="standard"
                        required
                        fullWidth
                        onChange={(event) => onchangeLeadInput(event)}
                      />
                      <TextField
                        value={formControls?.lastname}
                        label="Last Name"
                        name="lastname"
                        variant="standard"
                        fullWidth
                        onChange={(event) => onchangeLeadInput(event)}
                      />
                      <TextField
                        value={formControls?.mobile || ""}
                        label="Mobile"
                        name="mobile"
                        variant="standard"
                        required
                        fullWidth
                        onChange={(event) => onchangeLeadInput(event)}
                      />
                      <TextField
                        value={formControls?.email || ""}
                        label="Email"
                        name="email"
                        variant="standard"
                        fullWidth
                        onChange={(event) => onchangeLeadInput(event)}
                      />
                      <TextField
                        value={formControls?.gst || ""}
                        label="GST"
                        name="gst"
                        variant="standard"
                        fullWidth
                        onChange={(event) => onchangeLeadInput(event)}
                      />
                      <TextField
                        multiline
                        value={formControls?.address || ""}
                        label="Address"
                        name="address"
                        variant="standard"
                        fullWidth
                        onChange={(event) => onchangeLeadInput(event)}
                      />
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
                      <Autocomplete
                        options={users}
                        freeSolo
                        value={formControls.owner || ""}
                        getOptionLabel={(option) =>
                          typeof option === "string" ? option : option.firstname
                        }
                        getOptionSelected={(option, value) =>
                          option ? option.firstname === value.firstname : false
                        }
                        onChange={(event, value) =>
                          onchangeLeadOwnerInput(event, value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Owner"
                            name="owner"
                            variant="standard"
                            required
                            fullWidth
                            onChange={(event) => onChangeLeadOwnerSearch(event)}
                          />
                        )}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
