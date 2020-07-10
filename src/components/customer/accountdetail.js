import React from "react";
//import material ui core elements
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonBase from "@material-ui/core/ButtonBase";
import AddIcon from "@material-ui/icons/Add";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";


//define styles
const useStyles = makeStyles((theme) => ({
  addressitem: {
    height: '100%'
  },
  addresscard: {
    height: '100%'
  },
}));

export default function AccountDetailComp(props) {

  const classes = useStyles();

  const token = Cookies.get("token");
  const [formControls, setFormControls] = React.useState([]);
  const [accountTypes, setAccountTypes] = React.useState([
    { value: "Corporate", label: "Corporate" },
    { value: "Enterprise", label: "Enterprise" },
    { value: "Other", label: "Other" },
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
                  value={formControls?.gstin}
                  label="GSTIN"
                  name="gstin"
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
              <Grid item>
                <Typography>Addresses:</Typography>
                <Grid container spacing={1}>
                  <Grid
                    item
                    sm={12}
                    xs={12}
                    lg={4}
                    md={4}
                    className={classes.addressitem}
                  >
                    <Card variant="outlined">
                      <ButtonBase>
                        <CardContent>
                          <AddIcon />
                          <Typography>Add address</Typography>
                        </CardContent>
                      </ButtonBase>
                    </Card>
                  </Grid>
                  {formControls?.address?.map((item, index) => (
                    <Grid
                      item
                      key={index}
                      sm={12}
                      xs={12}
                      lg={4}
                      md={4}
                      className={classes.addressitem}
                    >
                      <Card variant="outlined">
                        <CardContent>
                          <Typography color="secondary" gutterBottom>
                            {item?.name}
                          </Typography>
                          <Typography>{item?.address1}</Typography>
                          <Typography>{item?.address2}</Typography>
                          <Typography>{item?.landmark}</Typography>
                          <Typography>
                            {item?.area}, {item?.district}
                          </Typography>
                          <Typography>
                            {item?.state}, {item?.country}
                          </Typography>
                          <Typography>{item?.pincode}</Typography>
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
