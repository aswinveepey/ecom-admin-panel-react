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
import { useDispatch, useSelector } from "react-redux";
//Constants Import
import AuthService from "../../services/auth"
import UserService from "../../services/user"


const useStyles = makeStyles((theme) => ({
  loginContainer: {
    padding: "30px",
    width:"20rem"
  },
  logo: {
    maxWidth: "100px",
    maxHeight: "100px",
    width: "auto",
    height: "auto",
  },
  griditem:{
    margin:"10px"
  }
}));

export default function LoginFormComp(props){
  const classes = useStyles();
  const history = useHistory();
  const authService = new AuthService();
  const userService = new UserService();
  const dispatch = useDispatch();
  const apifeedbackstate = useSelector((state) => state.apiFeedbackReducer);

  const tenantLogoFile = "logo-hhys.png";
  const tenantLogo ="https://litcomassets.s3.ap-south-1.amazonaws.com/tenantassets/"+tenantLogoFile;
  
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorState, setErrorState] = React.useState(false);
  const [loginState, setLoginState] = React.useState("Init");

  //handle username change
  const handleUsernameChange = (event)=>{
    event.preventDefault();
    setUsername(event.target.value)
  }
  //handle password change
  const handlePasswordChange = (event)=>{
    event.preventDefault();
    setPassword(event.target.value);
  }
  //handle login form submit
  var handleSubmit = async (event) => {
    setLoginState("Loading");
    event.preventDefault();
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    const reqBody = { username: username, password: password };
    authService
      .authenticate(signal, reqBody)
      .then((data) => {
        try {
          Cookies.set("token", data, { expires: 30 });
          if (Cookies.get("token")) {
            setLoginState("Authenticated");
          }
        } catch (error) {
          console.log(error.message);
          setLoginState("Init");
        }
      })
      .catch((error) => {
        setLoginState("Init");
      });

    return function cleanup() {
      abortController.abort();
    };
  };

  //Error handling through redux
  React.useEffect(() => {
    apifeedbackstate.apierror && setErrorState(apifeedbackstate.apierror);
  }, [apifeedbackstate]);

  //check auth and set user Redux state
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (loginState === "Authenticated") {
      userService
        .getSelf(signal)
        .then((data) => {
          dispatch({
            type: "SETUSER",
            payLoad: data,
          });
          history && history.push("/home");
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [loginState, dispatch, history]);
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      className={classes.loginContainer}
    >
      <form onSubmit={handleSubmit}>
        <Grid item className={classes.griditem}>
          <img src={tenantLogo} alt="brand logo" className={classes.logo} />
        </Grid>
        <Grid item className={classes.griditem}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>
        <Grid item className={classes.griditem}>
          <TextField
            fullWidth
            type="text"
            label="Username"
            name="username"
            variant="outlined"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
            required
            error={errorState === "Username Error"}
            helperText={
              errorState === "Username Error" ? "Invalid Username" : ""
            }
          />
        </Grid>
        <Grid item className={classes.griditem}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            required
            error={errorState === "Password Error"}
            helperText={
              errorState === "Password Error" ? "Invalid Password" : ""
            }
          />
        </Grid>
        <Grid item className={classes.griditem}>
          {loginState === "Loading" ? (
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
        <Grid item className={classes.griditem}>
          <Link href="#" variant="body2">
            Forgot Password?
          </Link>
        </Grid>
      </form>
    </Grid>
  );
}