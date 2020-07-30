import React from "react";
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import ChipInput from "material-ui-chip-input";
//styles - Material UI
// import { makeStyles } from "@material-ui/core/styles";
//api import
import TerritoryService from "../../../services/territory";

const territoryService = new TerritoryService();

export default function TerritoryDetailComp(props) {
  // const classes = useStyles();

  const [formControls, setFormControls] = React.useState([]);
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
      territoryService
        .updateTerritory(signal, formControls)
        .then((data) => {
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      territoryService
        .createTerritory(signal, formControls)
        .then((data) => {
          handleClose();
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  };
  //change territory input handle
  const onchangeTerritoryInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    if (name === "status") {
      controls[name] = event.target.checked;
    } else {
      controls[name] = value;
    }
    setFormControls(controls);
  };
  // add pincodes manually
  const onAddPincodes = (chip) => {
    const controls = { ...formControls };
    controls.pincodes = controls.pincodes || []
    controls.pincodes.push(chip)
    setFormControls(controls);
  };
  // delete pincodes
  const onDeletePincodes = (chip, index) => {
    const controls = { ...formControls };
    controls.pincodes.splice(index, 1);
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
        aria-labelledby="territory-dialog"
      >
        {/* <DialogTitle id="territory-dialog-title">
          {formControls.name}
        </DialogTitle> */}
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* <DialogContentText>Form Comes here</DialogContentText> */}
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  value={formControls?.name}
                  label="Territory Name"
                  name="name"
                  variant="standard"
                  // disabled={
                  //   formControls?.name?.toLowerCase() === "default"
                  //     ? true
                  //     : false
                  // }
                  fullWidth
                  onChange={onchangeTerritoryInput}
                />
              </Grid>
              <Grid item>
                <ChipInput
                  label="Pincodes"
                  value={formControls?.pincodes}
                  onDelete={onDeletePincodes}
                  onAdd={onAddPincodes}
                  // disabled={
                  //   formControls?.name?.toLowerCase() === "default"
                  //     ? true
                  //     : false
                  // }
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  label={formControls?.status ? "Active" : "Inactive"}
                  control={
                    <Switch
                      // disabled={
                      //   formControls?.name?.toLowerCase() === "default"
                      //     ? true
                      //     : false
                      // }
                      checked={formControls?.status}
                      color="primary"
                      name="status"
                      onChange={onchangeTerritoryInput}
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
    </React.Fragment>
  );
}
