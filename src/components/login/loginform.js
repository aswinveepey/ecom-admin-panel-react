import React from 'react'

import Cookies from "js-cookie";

import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router";
//Constants Import
import { BASE_URL } from "../../constants";


const useStyles = makeStyles((theme) => null);

export default function LoginFormComp(props){
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [submitprogress, setSubmitprogress] = React.useState(false);

  //handle username change
  function handleUsernameChange(event){
    event.preventDefault();
    setUsernameError(false)
    setUsername(event.target.value)
  }
  function handlePasswordChange(event) {
    setPasswordError(false);
    event.preventDefault();
    setPassword(event.target.value);
  }
  //handle password change
  //handle login form submit
  var handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitprogress(true);
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
      history && history.push("/home");
    } else {
      authResponse.json().then((data) => {
        const { message } = data;
        if (message === "Username Error") {
          setUsernameError(true);
        } else if (message === "Password Error") {
          setPasswordError(true);
        } else {
          console.log('Something went wrong')
        }
      });
    }
    setSubmitprogress(false);
  };
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      spacing={2}
      styles={{ margin: "auto" }}
    >
      <Grid item>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                type="text"
                label="Username"
                name="username"
                variant="outlined"
                value={username}
                onChange={(event) => handleUsernameChange(event)}
                required
                autoFocus
                error={usernameError}
                helperText={usernameError ? "Invalid Username" : ""}
              />
            </Grid>
            <Grid item>
              <TextField
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                value={password}
                onChange={(event) => handlePasswordChange(event)}
                required
                error={passwordError}
                helperText={passwordError ? "Invalid Password" : ""}
              />
            </Grid>
            <Grid item>
              {submitprogress ? (
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
  );
}