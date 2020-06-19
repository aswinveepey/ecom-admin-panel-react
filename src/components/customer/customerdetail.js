import React from 'react'
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid'
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default function CustomerDetailComp(props){

  const [formControls, setFormControls] = React.useState([]);
  const [customerTypes,setCustomerTypes] = React.useState([
    { value: "Regular", label: "Regular" },
    { value: "Business", label: "Business" },
  ]) 
  const [genderOptions, setGenderOPtions] = React.useState([
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ]);
  const [addressTypes, setAddressTypes] = React.useState([
    { value: "Delivery", label: "Delivery" },
    { value: "Billing", label: "Billing" },
  ]);

  React.useEffect(()=>{
    setFormControls(props.data)
  },[props])

  const handleClose = () => {
    props.handleDialogClose()
  };
  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(event)
  }
  const onchangeCustomerInput = (event)=>{
    event.preventDefault();
    const name = event.target.name
    const value = event.target.value
    const controls = {...formControls}
    controls[name] = value
    setFormControls(controls)
  }
  const onchangeCustomerAuthInput = (event)=>{
    event.preventDefault();
    const name = event.target.name
    const value = event.target.value
    const controls = {...formControls}
    if(name==='status'){
      controls.auth[name] = event.target.checked;
    } else{
      controls.auth[name] = value;
    }
    setFormControls(controls)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="customer-dialog"
      >
        <DialogTitle id="customer-dialog-title">
          {formControls?.firstname + " " + formControls?.lastname}
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
                  value={formControls?.gender}
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
                  select
                  value={formControls?.type}
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
                <TextField
                  value={formControls?.account?.name}
                  label="Account"
                  name="account"
                  variant="standard"
                  fullWidth
                  // onChange={(event) => onchangeCustomerInput(event)}
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
                  label="Email"
                  name="email"
                  variant="standard"
                  fullWidth
                  onChange={(event) => onchangeCustomerAuthInput(event)}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={formControls?.auth?.mobilenumber}
                  label="Mobile"
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