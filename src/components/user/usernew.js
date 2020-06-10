import React from "react";
//cookie library import
import Cookies from "js-cookie";
//material ui core imports
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
//material ui lab imports
import Autocomplete from "@material-ui/lab/Autocomplete";
//constants relative import
import { BASE_URL } from "../../constants";

class UserNewComp extends React.Component {
  state = {
    activeStep: 0,
    token: Cookies.get("token"),
    formControls: {
      firstname: "",
      lastname: "",
      contactnumber: "",
      designation: "",
      contactaddress: "",
      role: {
        _id: "",
        name: "",
      },
      territories: [],
      divisions: [],
      auth: {
        username: "",
        email: "",
        password: "",
        mobilenumber: "",
      },
    },
    territorydata: null,
    roledata: null,
    divisiondata: null,
    authComp: "",
    userComp: "",
    mapComp: "",
  };
  //Life cycle methods
  componentDidMount() {
    this.fetchRoles();
    this.fetchTerritories();
    this.fetchDivisions();
  }
  //get data from roles
  fetchRoles = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    };
    const fetchResponse = await fetch(BASE_URL + "role/", requestOptions);
    const { status } = fetchResponse;
    const roleResponse = await fetchResponse.json();
    if (status === 200) {
      this.setState({ roledata: roleResponse });
    }
  };
  fetchTerritories = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    };
    const fetchResponse = await fetch(BASE_URL + "territory/", requestOptions);
    const { status } = fetchResponse;
    const territoryResponse = await fetchResponse.json();
    if (status === 200) {
      this.setState({ territorydata: territoryResponse });
    }
  };
  fetchDivisions = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    };
    const fetchResponse = await fetch(BASE_URL + "division/", requestOptions);
    const { status } = fetchResponse;
    const divisionResponse = await fetchResponse.json();
    if (status === 200) {
      this.setState({ divisiondata: divisionResponse });
    }
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.formControls);
  };
  onChangeUserInput = async (event) => {
    const formControls = this.state.formControls;
    const name = event.target.name;
    const value = event.target.value;
    formControls[name] = value;
    this.setState({
      formControls: formControls,
    });
  };
  onChangeRoleInput = async (event, values) => {
    const formControls = this.state.formControls;
    formControls.role = values;
    this.setState({
      formControls: formControls,
    });
  };
  onChangeTerritoryInput = async (event, values) => {
    const formControls = this.state.formControls;
    formControls.territories = values;
    this.setState({
      formControls: formControls,
    });
  };
  onChangeDivisionInput = async (event, values) => {
    const formControls = this.state.formControls;
    formControls.divisions = values;
    this.setState({
      formControls: formControls,
    });
  };
  onChangeAuthInput = async (event) => {
    const formControls = this.state.formControls;
    const name = event.target.name;
    const value = event.target.value;
    formControls.auth[name] = value;
    this.setState({
      formControls: formControls,
    });
  };
  steps = [
    "Create User Credentials",
    "Update Contact Details",
    "Pick Roles, Territories, & Divisions",
    "Verify & Submit",
  ];
  varComp = (disabled) => ({
    authComp: (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.auth.email}
            label="Primary Email"
            name="email"
            variant="standard"
            required={true}
            type="email"
            fullWidth={true}
            onChange={this.onChangeAuthInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.auth.mobilenumber}
            label="Primary Mobile Number"
            required={true}
            name="mobilenumber"
            variant="standard"
            fullWidth={true}
            onChange={this.onChangeAuthInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.auth.username}
            label="User Name"
            required={true}
            name="username"
            variant="standard"
            fullWidth={true}
            onChange={this.onChangeAuthInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.auth.password}
            label="Password"
            required={true}
            name="password"
            type="password"
            variant="standard"
            fullWidth={true}
            onChange={this.onChangeAuthInput}
          />
        </Grid>
      </Grid>
    ),
    userComp: (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.firstname}
            label="First Name"
            name="firstname"
            variant="standard"
            required={true}
            fullWidth={true}
            onChange={this.onChangeUserInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.lastname}
            label="Last Name"
            variant="standard"
            required={true}
            fullWidth={true}
            name="lastname"
            onChange={this.onChangeUserInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.contactnumber}
            label="Contact Number"
            name="contactnumber"
            required={true}
            variant="standard"
            fullWidth={true}
            onChange={this.onChangeUserInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.designation}
            label="Designation"
            name="designation"
            variant="standard"
            required={true}
            fullWidth={true}
            onChange={this.onChangeUserInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            disabled={disabled}
            value={this.state.formControls.contactaddress}
            label="Contact Address"
            name="contactaddress"
            variant="standard"
            required={true}
            fullWidth={true}
            onChange={this.onChangeUserInput}
          />
        </Grid>
      </Grid>
    ),
    mapComp: (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Autocomplete
            disabled={disabled}
            options={this.state.roledata}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            value={this.state.formControls.role}
            name="name"
            onChange={this.onChangeRoleInput}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Role"
                required={true}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Autocomplete
            disabled={disabled}
            multiple
            options={
              this.state.territorydata &&
              this.state.territorydata.map((data) => data)
            }
            getOptionSelected={(option, value) =>
              option ? option.name === value.name : false
            }
            getOptionLabel={(option) => (option ? option.name : "")}
            value={
              this.state.formControls.territories &&
              this.state.formControls.territories.map((data) => data)
            }
            filterSelectedOptions
            name="name"
            onChange={this.onChangeTerritoryInput}
            renderInput={(params) => (
              <TextField
                disabled={disabled}
                {...params}
                variant="standard"
                label="Territories"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Autocomplete
            disabled={disabled}
            multiple
            options={
              this.state.divisiondata &&
              this.state.divisiondata.map((data) => data)
            }
            getOptionSelected={(option, value) =>
              option ? option.name === value.name : false
            }
            getOptionLabel={(option) => (option ? option.name : "")}
            value={
              this.state.formControls.divisions &&
              this.state.formControls.divisions.map((data) => data)
            }
            filterSelectedOptions
            name="name"
            onChange={this.onChangeDivisionInput}
            renderInput={(params) => (
              <TextField
                {...params}
                disabled={disabled}
                variant="standard"
                label="Divisions"
              />
            )}
          />
        </Grid>
      </Grid>
    ),
  });
  getStepContent = (step) => {
    switch (step) {
      case 0:
        return this.varComp(false).authComp;
      case 1:
        return this.varComp(false).userComp;
      case 2:
        return this.varComp(false).mapComp;
      default:
        return (
          <form onSubmit={this.handleSubmit}>
            <Grid container direction="column">
              <Grid item>{this.varComp(true).authComp}</Grid>
              <Grid item>{this.varComp(true).userComp}</Grid>
              <Grid item>{this.varComp(true).mapComp}</Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Verify & Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        );
    }
  };
  render() {
    return (
      <React.Fragment>
        <Paper className="paper-box" variant="elevation" elevation={24}>
          {/* <form onSubmit={this.handleSubmit}> */}
          <Stepper activeStep={this.state.activeStep} orientation="vertical">
            {this.steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  <Typography>{label}</Typography>
                </StepLabel>
                <StepContent>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>{this.getStepContent(index)}</Grid>
                    <Grid item>
                      {this.state.activeStep === this.steps.length - 1 ? (
                        <div></div>
                      ) : (
                        <Grid container spacing={1}>
                          <Grid item>
                            <Button
                              disabled={this.state.activeStep <= 0}
                              onClick={() => {
                                this.setState({
                                  activeStep: this.state.activeStep - 1,
                                });
                              }}
                            >
                              Back
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={() => {
                                this.setState({
                                  activeStep: this.state.activeStep + 1,
                                });
                              }}
                            >
                              Next
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {/* </form> */}
        </Paper>
      </React.Fragment>
    );
  }
}

export default UserNewComp;
