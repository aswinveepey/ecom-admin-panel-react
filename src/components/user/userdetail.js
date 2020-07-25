//standard react import
import React from "react";
//material ui core imports
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
// import LinearProgress from "@material-ui/core/LinearProgress";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Divider from "@material-ui/core/Divider";
//material ui lab imports
import Autocomplete from "@material-ui/lab/Autocomplete";
//material ui icon imports
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
//api import
import UserApi from "../../api/user"
import RoleApi from "../../api/role"
import TerritoryApi from "../../api/territory"
import DivisionApi from "../../api/division"

const userApi = new UserApi();
const roleApi = new RoleApi();
const territoryApi = new TerritoryApi();
const divisionApi = new DivisionApi();

export default function UserDetailComp(props) {

  const [editTogggle, setEditToggle] = React.useState(false)
  const [roles, setRoles] = React.useState([])
  const [territories, setTerritories] = React.useState([])
  const [divisions, setDivisions] = React.useState([])
  const [formControls, setFormControls] = React.useState([])

  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    userApi
      .getOneUser(signal, props.userId)
      .then((data) => setFormControls(data))
      .catch((err) => console.log(err));
    editTogggle &&
      roleApi
        .getRoles(signal)
        .then((data) => data && setRoles(data))
        .catch((err) => console.log(err));
    editTogggle &&
      territoryApi
        .getTerritories(signal)
        .then((data) => data && setTerritories(data))
        .catch((err) => console.log(err));
    editTogggle &&
      divisionApi
        .getDivisions(signal)
        .then((data) => data && setDivisions(data))
        .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [props, editTogggle]);

  //get data from territories
  const handlesubmit = (event) => {
    event.preventDefault();
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    userApi
      .updateUser(signal, formControls)
      .then((data) => {
        setEditToggle(false);
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  };
  const onChangeUserInput = (event) => {
    event.preventDefault()
    const name = event.target.name;
    const value = event.target.value;
    const controls = { ...formControls };
    controls[name] = value;
    setFormControls(controls)
  };
  const onChangeRoleInput = (values, event) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.role = values;
    setFormControls(controls)
  };
  const onChangeTerritoryInput = (values, event) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.territories = values;
    setFormControls(controls);
  };
  const onChangeDivisionInput = (values, event) => {
    event.preventDefault();
    const controls = { ...formControls };
    controls.divisions = values;
    setFormControls(controls);
  };
  const onChangeAuthInput = async (event) => {
    event.preventDefault();
    const controls = { ...formControls };
    const name = event.target.name;
    const value = event.target.value;
    if (name === "status") {
      controls.auth[name] = event.target.checked;
    } else {
      controls.auth[name] = value;
    }
    setFormControls(controls);
  };
    return (
      <React.Fragment>
        {/* Initial conditions - ask user to select a user */}
        {
          !formControls?._id && (
            <Typography variant="h6">
              Select a User to see the details
            </Typography>
          )
        }
        <Paper style={{ padding: "10px" }} elevation={editTogggle ? 2 : 0}>
          <form onSubmit={handlesubmit}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid container direction="row" alignContent="center">
                  <Grid item style={{ paddingTop: "10px" }}>
                    <Typography variant="h6">
                      {formControls?.firstname + " " + formControls?.lastname}
                      &nbsp;
                    </Typography>
                    {/* Default state - show user option to edit fields */}
                  </Grid>
                  <Grid item>
                    {!editTogggle && (
                      <IconButton onClick={() => setEditToggle(true)}>
                        <EditIcon color="secondary" />
                      </IconButton>
                    )}
                    {/* If editing, show submit and cancel options */}
                    {editTogggle && (
                      <div>
                        <IconButton onClick={() => setEditToggle(false)}>
                          <CloseIcon color="secondary" />
                        </IconButton>
                        <IconButton type="submit">
                          <CheckIcon color="primary" />
                        </IconButton>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {/* Show user details inside form to enable submit. Editable state controlled using edittoggle */}
              <Grid item>
                <Grid container spacing={1} className="form-container">
                  <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Typography variant="h5">Contact Details</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.firstname || ""}
                      label="First Name"
                      name="firstname"
                      variant="standard"
                      fullWidth={true}
                      disabled={!editTogggle}
                      onChange={onChangeUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.lastname || ""}
                      label="Last Name"
                      variant="standard"
                      fullWidth={true}
                      name="lastname"
                      disabled={!editTogggle}
                      onChange={onChangeUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.contactnumber || ""}
                      label="Contact Number"
                      name="contactnumber"
                      variant="standard"
                      fullWidth={true}
                      disabled={!editTogggle}
                      onChange={onChangeUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.designation || ""}
                      label="Designation"
                      name="designation"
                      variant="standard"
                      fullWidth={true}
                      disabled={!editTogggle}
                      onChange={onChangeUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.contactaddress || ""}
                      label="Contact Address"
                      name="contactaddress"
                      variant="standard"
                      fullWidth={true}
                      disabled={!editTogggle}
                      onChange={onChangeUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Autocomplete
                      disabled={!editTogggle}
                      options={roles}
                      getOptionSelected={(option, value) =>
                        option ? option.name === value.name : false
                      }
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.name
                      }
                      value={formControls?.role || ""}
                      name="name"
                      onChange={(event, value) =>
                        onChangeRoleInput(value, event)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Role"
                          disabled={!editTogggle}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Autocomplete
                      multiple
                      disabled={!editTogggle}
                      options={territories.map((data) => data)}
                      getOptionSelected={(option, value) =>
                        option ? option.name === value.name : false
                      }
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.name
                      }
                      value={
                        formControls?.territories?.map((data) => data) || []
                      }
                      filterSelectedOptions
                      name="name"
                      onChange={(event, value) =>
                        onChangeTerritoryInput(value, event)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Territories"
                          disabled={!editTogggle}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Autocomplete
                      multiple
                      disabled={!editTogggle}
                      options={divisions.map((data) => data)}
                      getOptionSelected={(option, value) =>
                        option ? option.name === value.name : false
                      }
                      getOptionLabel={(option) =>
                        typeof option === "string" ? option : option.name
                      }
                      value={formControls?.divisions?.map((data) => data) || []}
                      filterSelectedOptions
                      name="name"
                      onChange={(event, value) =>
                        onChangeDivisionInput(value, event)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Divisions"
                          disabled={!editTogggle}
                        />
                      )}
                    />
                  </Grid>
                  {/* </Grid>
                    </Grid> */}
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} className="form-container">
                  <Grid item xs={12} sm={12} lg={12} md={12}>
                    <Typography variant="h5">Authentication Details</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          name="status"
                          checked={formControls?.auth?.status || true}
                          disabled={!editTogggle}
                          onChange={onChangeAuthInput}
                          color="primary"
                        />
                      }
                      label="User status"
                      labelPlacement="start"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.auth?.username || ""}
                      label="User Name"
                      name="username"
                      variant="standard"
                      fullWidth={true}
                      disabled={!editTogggle}
                      onChange={onChangeAuthInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.auth?.email || ""}
                      label="Registered Email"
                      name="email"
                      variant="standard"
                      fullWidth={true}
                      disabled={!editTogggle}
                      onChange={onChangeAuthInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField
                      value={formControls?.auth?.mobilenumber || ""}
                      label="Registered Mobile Number"
                      name="mobilenumber"
                      variant="standard"
                      fullWidth={true}
                      disabled={!editTogggle}
                      onChange={onChangeAuthInput}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </React.Fragment>
    );
}
