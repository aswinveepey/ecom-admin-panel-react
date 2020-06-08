//standard react import
import React from 'react'
//cookie library import
import Cookies from "js-cookie";
//material ui core imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
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


class UserDetailComp extends React.Component {
  state = {
    paperelevation: 0,
    userid: "",
    userdata: "",
    fetchstatus: "init",
    editTogggle: false,
    roledata: [],
    territorydata: [],
    divisiondata: [],
    token: Cookies.get("token"),
    formData: {
      username: null,
    },
  };
  //Life cycle methods
  componentDidMount() {
    this.fetchRoles();
    this.fetchTerritories();
    this.fetchDivisions();
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
    this.setState({ fetchstatus: "loading" });
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
      this.setState({ fetchstatus: "fetched", userdata: userResponse.data });
    } else {
      this.setState({ fetchstatus: "unAuthenticated" });
    }
  };
  handlesubmit = async (event) => {
    event.preventDefault();
    this.setState({ editTogggle: false });
  };
  render() {
    return (
      <React.Fragment>
        {/* Initial conditions - ask user to select a user */}
        {this.state.fetchstatus === "init" && (
          <Container>
            <Typography variant="h6">
              Select a User to see the details
            </Typography>
          </Container>
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
            <form onSubmit={this.handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid container direction="row" alignContent="center">
                    <Grid item style={{ paddingTop: "10px" }}>
                      <Typography variant="h6">
                        {this.state.userdata.firstname +
                          " " +
                          this.state.userdata.lastname}
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
                            onClick={() =>
                              this.setState({
                                editTogggle: false,
                                paperelevation: 0,
                              })
                            }
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
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1">
                        Contact Details
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.firstname}
                            label="First Name"
                            name="firstname"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.lastname}
                            label="Last Name"
                            name="lastname"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.contactnumber}
                            label="Contact Number"
                            name="contactnumber"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.designation}
                            label="Designation"
                            name="designation"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.contactaddress}
                            label="Contact Address"
                            name="contactaddress"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            disabled={!this.state.editTogggle}
                            options={this.state.roledata}
                            getOptionSelected={(option, value) =>
                              option.name === value.name
                            }
                            getOptionLabel={(option) => option.name}
                            defaultValue={this.state.userdata.role}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Role"
                                disabled={!this.state.editTogggle}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            disabled={!this.state.editTogggle}
                            options={this.state.territorydata.map(
                              (data) => data
                            )}
                            getOptionSelected={(option, value) =>
                              option? option.name === value.name : false
                            }
                            getOptionLabel={(option) =>
                              option ? option.name : ""
                            }
                            defaultValue={this.state.userdata.territories.map(
                              (data) => data
                            )}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Territories"
                                disabled={!this.state.editTogggle}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            multiple
                            disabled={!this.state.editTogggle}
                            options={this.state.divisiondata.map(
                              (data) => data
                            )}
                            getOptionSelected={(option, value) =>
                              option? option.name === value.name : false
                            }
                            getOptionLabel={(option) =>
                              option ? option.name : ""
                            }
                            defaultValue={this.state.userdata.divisions.map(
                              (data) => data
                            )}
                            filterSelectedOptions
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Territories"
                                disabled={!this.state.editTogggle}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item sm={3}>
                      <Typography variant="subtitle1">
                        Authentication Details
                      </Typography>
                    </Grid>
                    <Grid item sm={9}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={this.state.userdata.auth.status}
                                disabled={!this.state.editTogggle}
                                color="primary"
                              />
                            }
                            label="User status"
                            labelPlacement="start"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.auth.username}
                            label="User Name"
                            name="username"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.auth.email}
                            label="Registered Email"
                            name="email"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            value={this.state.userdata.auth.mobilenumber}
                            label="Registered Mobile Number"
                            name="mobilenumber"
                            variant="outlined"
                            fullWidth={true}
                            disabled={!this.state.editTogggle}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </React.Fragment>
    );
  }
}

export default UserDetailComp;