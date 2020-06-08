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
//material ui lab imports
import Autocomplete from "@material-ui/lab/Autocomplete";
//material ui icon imports
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
//constants relative import
import { BASE_URL } from "../../constants";


class UserDetailComp extends React.Component {
  state = {
    userdata: "",
    fetchstatus: "init",
    editTogggle: false,
    roledata:[
      {
        name: 'admin'
      },
      {
        name: 'agent'
      }
    ]
  };
  // check and update changes based on props change from parent
  componentDidUpdate(prevProps) {
    if (!(this.props.userId === prevProps.userId)) {
      this.fetchUserData(this.props.userId);
    }
  };
  // get the user data from api
  fetchUserData = async (userId) => {
    this.setState({fetchstatus: 'loading'})
    let token;
    try {
      token = Cookies.get("token");
    } catch (error) {
      console.log(error);
      return null;
    }
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    const fetchResponse = await fetch(
      BASE_URL + "user/" + userId,
      requestOptions
    );
    const { status } = fetchResponse;
    const jsonResponse = await fetchResponse.json();
    if (status === 200) {
      this.setState({ fetchstatus: "fetched", userdata: jsonResponse.data });
    } else {
      this.setState({ fetchstatus: "unAuthenticated" });
    }
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
          <Paper className="paper-box" variant="outlined">
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">
                  User Details&nbsp;
                  {/* Default state - show user option to edit fields */}
                  {!this.state.editTogggle && (
                    <IconButton
                      onClick={() => this.setState({ editTogggle: true })}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  {/* If editing, show submit and cancel options */}
                  {this.state.editTogggle && (
                    <IconButton
                      onClick={() => this.setState({ editTogggle: false })}
                    >
                      <CheckIcon color="action" />
                    </IconButton>
                  )}
                </Typography>
              </Grid>
              {/* Show user details inside form to enable submit. Editable state controlled using edittoggle */}
              <form>
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        value={this.state.userdata.firstname}
                        label="First Name"
                        name="firstname"
                        variant="outlined"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={this.state.userdata.lastname}
                        label="Last Name"
                        name="lastname"
                        variant="outlined"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={this.state.userdata.contactnumber}
                        label="Contact Number"
                        name="contactnumber"
                        variant="outlined"
                        fullWidth={true}
                        disabled={!this.state.editTogggle}
                      />
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
        )}
      </React.Fragment>
    );
  }
}

export default UserDetailComp;