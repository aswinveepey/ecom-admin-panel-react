import React from "react";
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
import {BRAND_NAME} from '../../constants'

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    usernameerror: false,
    passworderror: false,
    progress: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ progress: true });
    this.setState({ usernameerror: false, passworderror: false });
    const {username, password} = await this.state;
    if (username === "admin@littech.in") {
      if (password === "secret") {
        this.props.history.push("/home");
      } else {
        this.setState({ passworderror: true });
      }
    } else {
      this.setState({ usernameerror: true });
    }
    this.setState({ progress: false });
  };
  render() {
    return (
      <div>
        <AppBar position="static" alignitems="center" color="primary">
          <Toolbar>
            <Grid container justify="center" wrap="wrap">
              <Grid item>
                <Typography variant="h6">{BRAND_NAME}</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="column"
          spacing={3}
        >
          <Grid item>
            <Grid container spacing={0} justify="center">
              <Grid item>
                <Paper
                  variant="elevation"
                  elevation={2}
                  className="login-background"
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    spacing={2}
                    // className="login-form"
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
                              type="email"
                              label="Email"
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
      </div>
    );
  }
}

export default Login;