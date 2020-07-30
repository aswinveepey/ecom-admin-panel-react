import React, {Suspense} from 'react'
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import AddIcon from "@material-ui/icons/Add";
//styles - Material UI
import { makeStyles } from "@material-ui/core/styles";

import CustomerService from "../../services/customer";
import AccountService from "../../services/account";

const AddressFormComp = React.lazy(() => import("./addressform"));
//define styles
const useStyles = makeStyles((theme) => ({
  addressitem: {
    height: '100%'
  },
}));

const customerService = new CustomerService();
const accountService = new AccountService();

export default function CustomerDetailComp(props){
  const classes = useStyles();

  const [formControls, setFormControls] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [accountSearchString, setAccountSearchString] = React.useState("");
  const [customerTypes,setCustomerTypes] = React.useState([
    { value: "Regular", label: "Regular" },
    { value: "Business", label: "Business" },
  ]) 
  const [genderOptions, setGenderOPtions] = React.useState([
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]);
  const [addressFormOpen, setAddressFormOpen] = React.useState(false);
  //handle dialog close - call parent function
  const handleClose = () => {
    props.handleDialogClose()
  };
  // handle dialog form submit
  const handleSubmit = (event)=>{
    event.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;
    if(formControls._id){
      customerService
        .updateCustomer(signal, formControls)
        .then((data) => {
          // console.log(data);
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      customerService
        .createCustomer(signal, formControls)
        .then((data) => {
          console.log(data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }
  //handle add adress click
  const handleAddAddress = ()=>{
    setAddressFormOpen(true);
  }
  const handleAddressFormClose = () => {
    setAddressFormOpen(false);
  };
  //handle add/change address
  const handleAddressChange = (data, index) => {
    const controls = { ...formControls };
    controls.address = controls.address || [];
    if(index){
      controls.address[index] = data
    } else {
      controls.address.push(data)
    }
    setFormControls(controls)
    setAddressFormOpen(false);
  };
  //handle address deletion
  const deleteAddress = (index)=>{
    const controls = { ...formControls }
    controls.address.splice(index, 1)
    setFormControls(controls);
  }
  //handle change address click
  //change customer input handle
  const onchangeCustomerInput = (event)=>{
    event.preventDefault();
    const name = event.target.name
    const value = event.target.value
    const controls = {...formControls}
    controls[name] = value
    setFormControls(controls)
  }
  //change auth input handle - auth is a nested object of customer
  const onchangeCustomerAuthInput = (event)=>{
    event.preventDefault();
    const name = event.target.name
    const value = event.target.value
    const controls = {...formControls}
    controls.auth = controls.auth || {};
    if(name==='status'){
      controls.auth[name] = event.target.checked;
    } else{
      controls.auth[name] = value;
    }
    setFormControls(controls)
  }
  //change account input handle
  const onchangeCustomerAccountInput = (event, value)=>{
    event.preventDefault();
    const controls = {...formControls}
    controls.account = value;
    setFormControls(controls)
  }
  //Change search term - Account
  const onChangeAccountSearch = (event) => {
    event.preventDefault();
    setAccountSearchString(event.target.value);
  };
  //set form controls from props
  React.useEffect(() => {
    setFormControls(props.data);
  }, [props]);
  //get account from search string
  React.useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    accountService
      .searchAccounts(signal, accountSearchString)
      .then((data) => setAccounts(data))
      .catch((err) => console.log(err));
    return function cleanup() {
        abortController.abort();
      };
  },[accountSearchString])

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="customer-dialog"
      >
        <DialogTitle id="customer-dialog-title">
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
                  fullWidth
                  onChange={(event) => onchangeCustomerInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.lastname}
                  label="Last Name"
                  name="lastname"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCustomerInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  value={formControls?.gender || ""}
                  label="gender"
                  name="gender"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCustomerInput(event)}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.birthday?.substring(0, 10)}
                  label="Date of Birth"
                  name="birthday"
                  variant="standard"
                  type="date"
                  fullWidth
                  onChange={(event) => onchangeCustomerInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.contactnumber}
                  label="Contact Mobile"
                  name="contactnumber"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCustomerInput(event)}
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
                  onChange={(event) => onchangeCustomerInput(event)}
                >
                  {customerTypes.map((option) => (
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
                    onchangeCustomerAccountInput(event, value)
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
              <Grid item>
                <TextField
                  value={formControls?.auth?.username}
                  label="Username"
                  name="username"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCustomerAuthInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.auth?.email}
                  label="Registered Email"
                  name="email"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCustomerAuthInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.auth?.mobilenumber}
                  label="Registered Mobile"
                  name="mobilenumber"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCustomerAuthInput(event)}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  label={formControls?.auth?.status ? "Active" : "Inactive"}
                  control={
                    <Switch
                      checked={formControls?.auth?.status}
                      color="primary"
                      name="status"
                      onChange={(event) => onchangeCustomerAuthInput(event)}
                    />
                  }
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
                      <ButtonBase onClick={handleAddAddress}>
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
                          <Button
                            size="small"
                            color="secondary"
                            onClick={deleteAddress.bind(this, index)}
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
        <Suspense fallback={<div>Loading...</div>}>
          <AddressFormComp
            open={addressFormOpen}
            handleClose={handleAddressFormClose}
            handleSubmit={handleAddressChange}
          />
        </Suspense>
      </Dialog>
    </React.Fragment>
  );
}