import React from "react";
import Cookies from "js-cookie";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
  CircularProgress,
} from "@material-ui/core";

import SnackBarComp from '../common/snackbar'
import {BRAND_NAME, BASE_URL} from '../../constants'

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    usernameerror: false,
    passworderror: false,
    progress: false,
    snackbaropen: false,
  };

  //handle login form submit
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ progress: true });
    this.setState({ usernameerror: false, passworderror: false });
    const { username, password } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    };
    const authResponse = await fetch(
      BASE_URL + "auth/authenticate",
      requestOptions
    );
    const { status } = authResponse;
    if (status === 200) {
      const { token } = await authResponse.json();
      try {
        Cookies.set("token", token, { expires: 30 });
      } catch (error) {
        console.log('Unable to set cookie');
      }
      this.props.history.push("/home");
    } else {
      authResponse.json().then((data) => {
        const { message } = data;
        if (message === "Username Error") {
          this.setState({ usernameerror: true});
        } else if (message === "Password Error") {
          this.setState({ passworderror: true });
        } else {
          this.setState({snackbaropen: true });
        }
      });
    }
    this.setState({ progress: false });
  };
  render() {
    return (
      <div>
        <AppBar position="static" alignitems="center" color="primary" className='appbar'>
          <Toolbar>
            <Grid container justify="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">{BRAND_NAME}</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Paper className='paper-container'>
          <Grid container direction="column">
            <Grid item>
              <Grid container spacing={0} justify="center">
                <Grid item>
                  <Paper
                    variant="elevation"
                    elevation={1}
                    className="login-background"
                    square
                  >
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Typography component="h1" variant="h5">
                          Sign in
                        </Typography>
                      </Grid>
                      <Grid item>
                        <form onSubmit={this.handleSubmit}>
                          <Grid container direction="column" spacing={2}>
                            <Grid item>
                              <TextField
                                type="text"
                                label="Username"
                                name="username"
                                variant="outlined"
                                value={this.state.username}
                                onChange={(event) =>
                                  this.setState({
                                    [event.target.name]: event.target.value,
                                  })
                                }
                                required
                                autoFocus
                                error={this.state.usernameerror}
                                helperText={
                                  this.state.usernameerror
                                    ? "Invalid Username"
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                type="password"
                                label="Password"
                                name="password"
                                variant="outlined"
                                value={this.state.password}
                                onChange={(event) =>
                                  this.setState({
                                    [event.target.name]: event.target.value,
                                  })
                                }
                                required
                                error={this.state.passworderror}
                                helperText={
                                  this.state.passworderror
                                    ? "Invalid Password"
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item>
                              {this.state.progress ? (
                                <CircularProgress />
                              ) : (
                                <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  className="button-block"
                                >
                                  Submit
                                </Button>
                              )}
                            </Grid>
                          </Grid>
                        </form>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2">
                          Forgot Password?
                        </Link>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        {this.state.snackbaropen && (
          <SnackBarComp
            snackbaropen={true}
            message="Something went wrong. We are not sure what"
          />
        )}
      </div>
    );
  }
}

export default Login;