//standard react import
import React from "react";
//cookie library import
import Cookies from "js-cookie";
//material ui core imports
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
//material ui lab imports
import Autocomplete from "@material-ui/lab/Autocomplete";
//material ui icon imports
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
//constants relative import
import { BASE_URL } from "../../constants";
//component import
import SnackBarComp from "../common/snackbar";

class UserDetailComp extends React.Component {
  state = {
    paperelevation: 1,
    userid: this.props.userId,
    fetchstatus: "init",
    editTogggle: false,
    roledata: [],
    territorydata: [],
    divisiondata: [],
    token: Cookies.get("token"),
    formControls: null,
    snackbaropen: false,
    snackbarmessage: null,
  };
  //Life cycle methods
  componentDidMount() {
    this.fetchRoles();
    this.fetchTerritories();
    this.fetchDivisions();
    this.state.userid && this.fetchUserData(this.props.userId);
  }
  // check and update changes based on props change from parent
  componentDidUpdate(prevProps) {
    if (!(this.props.userId === prevProps.userId)) {
      this.fetchUserData(this.props.userId);
    }
  }
  //set the token
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
  //get data from territories
  // get the user data from api
  fetchUserData = async (userId) => {
    this.setState({ fetchstatus: "loading", snackbaropen: false });
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    };
    const fetchResponse = await fetch(
      BASE_URL + "user/" + userId,
      requestOptions
    );
    const { status } = fetchResponse;
    const userResponse = await fetchResponse.json();
    if (status === 200) {
      this.setState({
        fetchstatus: "fetched",
        formControls: userResponse.data,
      });
    } else {
      this.setState({ fetchstatus: "unAuthenticated" });
    }
  };
  handlesubmit = async (event) => {
    event.preventDefault();
    this.setState({
      editTogggle: false,
      paperelevation: 0,
      poststatus: "loading",
    });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
      body: JSON.stringify(this.state.formControls),
    };
    try {
      const fetchResponse = await fetch(
        BASE_URL + "user/" + this.state.formControls._id,
        requestOptions
      );
      const { status } = fetchResponse;
      // const userResponse = await fetchResponse.json();
      if (status === 200) {
        this.setState({
          poststatus: "succesful",
          snackbaropen: true,
          snackbarmessage: "Succesfully Updated the User",
        });
      } else {
        this.setState({
          poststatus: "error",
          snackbaropen: true,
          snackbarmessage: "Uh-Oh! Something Went Wrong",
        });
      }
    } catch (error) {
      console.log(error);
    }
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
    if (name === "status") {
      formControls.auth[name] = event.target.checked;
    } else {
      formControls.auth[name] = value;
    }
    this.setState({
      formControls: formControls,
    });
  };
  render() {
    return (
      <React.Fragment>
        {/* Initial conditions - ask user to select a user */}
        {this.state.fetchstatus === "init" && (
          <Paper
            className="paper-box"
            variant="elevation"
            elevation={this.state.paperelevation}
          >
            <Typography variant="h6">
              Select a User to see the details
            </Typography>
          </Paper>
        )}
        {/* Show loading indication to user */}
        {this.state.fetchstatus === "loading" && (
          <Container>
            <Typography variant="h6">Loading</Typography>
            <LinearProgress color="secondary" />
          </Container>
        )}
        {/* Show user details */}
        {this.state.fetchstatus === "fetched" && (
          <Paper
            className="paper-box"
            variant="elevation"
            elevation={this.state.paperelevation}
          >
            <form onSubmit={this.handlesubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid container direction="row" alignContent="center">
                    <Grid item style={{ paddingTop: "10px" }}>
                      <Typography variant="h6">
                        {this.state.formControls.firstname +
                          " " +
                          this.state.formControls.lastname}
                        &nbsp;
                      </Typography>
                      {/* Default state - show user option to edit fields */}
                    </Grid>
                    <Grid item>
                      {!this.state.editTogggle && (
                        <IconButton
                          onClick={() =>
                            this.setState({
                              editTogggle: true,
                              paperelevation: 24,
                            })
                          }
                        >
                          <EditIcon color="secondary" />
                        </IconButton>
                      )}
                      {/* If editing, show submit and cancel options */}
                      {this.state.editTogggle && (
                        <div>
                          <IconButton
                            onClick={() =>
                              this.setState({
                                editTogggle: false,
                                paperelevation: 0,
                              })
                            }
                          >
                            <CloseIcon color="secondary" />
                          </IconButton>
                          <IconButton
                            type="submit"
                            // onClick={() =>
                            //   this.setState({
                            //     editTogggle: false,
                            //     paperelevation: 0,
                            //   })
                            // }
                          >
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
                        value={this.state.formControls.firstname}
                        label="First Name"
                        name="firstname"
                        variant="standard"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeUserInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        value={this.state.formControls.lastname}
                        label="Last Name"
                        variant="standard"
                        fullWidth={true}
                        name="lastname"
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeUserInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        value={this.state.formControls.contactnumber}
                        label="Contact Number"
                        name="contactnumber"
                        variant="standard"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeUserInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        value={this.state.formControls.designation}
                        label="Designation"
                        name="designation"
                        variant="standard"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeUserInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        value={this.state.formControls.contactaddress}
                        label="Contact Address"
                        name="contactaddress"
                        variant="standard"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeUserInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Autocomplete
                        disabled={!this.state.editTogggle}
                        options={this.state.roledata}
                        getOptionSelected={(option, value) =>
                          option.name === value.name
                        }
                        getOptionLabel={(option) => option.name}
                        value={this.state.formControls.role}
                        name="name"
                        onChange={this.onChangeRoleInput}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Role"
                            disabled={!this.state.editTogggle}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Autocomplete
                        multiple
                        disabled={!this.state.editTogggle}
                        options={this.state.territorydata.map((data) => data)}
                        getOptionSelected={(option, value) =>
                          option ? option.name === value.name : false
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        value={this.state.formControls.territories.map(
                          (data) => data
                        )}
                        filterSelectedOptions
                        name="name"
                        onChange={this.onChangeTerritoryInput}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Territories"
                            disabled={!this.state.editTogggle}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Autocomplete
                        multiple
                        disabled={!this.state.editTogggle}
                        options={this.state.divisiondata.map((data) => data)}
                        getOptionSelected={(option, value) =>
                          option ? option.name === value.name : false
                        }
                        getOptionLabel={(option) => (option ? option.name : "")}
                        value={this.state.formControls.divisions.map(
                          (data) => data
                        )}
                        filterSelectedOptions
                        name="name"
                        onChange={this.onChangeDivisionInput}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            label="Divisions"
                            disabled={!this.state.editTogggle}
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
                      <Typography variant="h5">
                        Authentication Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            name="status"
                            checked={this.state.formControls.auth.status}
                            disabled={!this.state.editTogggle}
                            onChange={this.onChangeAuthInput}
                            color="primary"
                          />
                        }
                        label="User status"
                        labelPlacement="start"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        value={this.state.formControls.auth.username}
                        label="User Name"
                        name="username"
                        variant="standard"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeAuthInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        value={this.state.formControls.auth.email}
                        label="Registered Email"
                        name="email"
                        variant="standard"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeAuthInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        value={this.state.formControls.auth.mobilenumber}
                        label="Registered Mobile Number"
                        name="mobilenumber"
                        variant="standard"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                        onChange={this.onChangeAuthInput}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
            <SnackBarComp
              snackbaropen={this.state.snackbaropen}
              message={this.state.snackbarmessage}
            />
          </Paper>
        )}
      </React.Fragment>
    );
  }
}

export default UserDetailComp;
