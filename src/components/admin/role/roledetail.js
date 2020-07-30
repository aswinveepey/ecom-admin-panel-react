import React from "react";
//Core Elements - Material UI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//styles - Material UI
// import { makeStyles } from "@material-ui/core/styles";
//api import
import RoleService from "../../../services/role";

const roleService = new RoleService();

export default function RoleDetailComp(props) {
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
      roleService
        .updateRole(signal, formControls)
        .then((data) => {
          console.log(data);
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      roleService
        .createRole(signal, formControls)
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
  //change territory input handle
  const onchangeRoleInput = (event) => {
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
        aria-labelledby="role-dialog"
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
                  label="Role Name"
                  name="name"
                  variant="standard"
                  fullWidth
                  onChange={onchangeRoleInput}
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
