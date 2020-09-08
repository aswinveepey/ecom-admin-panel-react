import React from 'react'
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField";

export default function AddressFormComp(props){
  const [data, setData] = React.useState([])
  
  React.useEffect(()=>{
    props.data && setData(props.data)
  },[props.data])

  const handleClose = ()=>{
    props.handleClose();
  }
  const onChange = (event)=>{
    event.preventDefault()
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...data };
    controls[name] = value;
    setData(controls)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleSubmit(data)
  };
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth={"xs"}
        aria-labelledby="address-detail-dialog"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Address</DialogTitle>
          <DialogContent>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  label="name"
                  name="name"
                  helperText="Enter a unique address name"
                  required
                  fullWidth
                  value={data?.name || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="address1"
                  name="address1"
                  required
                  fullWidth
                  value={data?.address1 || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="address2"
                  name="address2"
                  fullWidth
                  value={data?.address2 || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="landmark"
                  name="landmark"
                  required
                  fullWidth
                  value={data?.landmark || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="area"
                  name="area"
                  required
                  fullWidth
                  value={data?.area || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="district"
                  name="district"
                  required
                  fullWidth
                  value={data?.district || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="state"
                  name="state"
                  required
                  fullWidth
                  value={data?.state || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="country"
                  name="country"
                  required
                  fullWidth
                  value={data?.country || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="pincode"
                  name="pincode"
                  required
                  fullWidth
                  value={data?.pincode || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="latitude"
                  name="lat"
                  required
                  fullWidth
                  value={data?.lat || ""}
                  onChange={onChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="longitude"
                  name="long"
                  required
                  fullWidth
                  value={data?.long || ""}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add Address
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}