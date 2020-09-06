import React from "react";
import Grid from '@material-ui/core/Grid'
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import LoginFormComp from './loginform'
import { useSelector, useDispatch } from "react-redux";
import UserService from "../../services/user";
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
  hero: {
    width: "100%",
    // height: "100vh",
  },
  loginForm: {
    width: "100%",
    height: "100vh",
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const history = useHistory(); //react router
  const dispatch = useDispatch(); //send redux actions
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const apistate = useSelector((state) => state.apiFeedbackReducer);
  const userState = useSelector((state) => state.userStateReducer);

  const tenantHeroFile = "hero-image-hhys.png";
  const tenantHero =
    "https://litcomassets.s3.ap-south-1.amazonaws.com/tenantassets/" +
    tenantHeroFile;

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  React.useEffect(() => {
    (apistate.apisuccess || apistate.apierror) && setSnackBarOpen(true);
  }, [apistate]);

  //get & set user state
  React.useEffect(() => {
    const userApi = new UserService(); //get user data
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!userState.firstname) {
      userApi
        .getSelf(signal)
        .then((data) => {
          if (data) {
            dispatch({
              type: "SETUSER",
              payLoad: data,
            });
            history && history.push("/home");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <img src={tenantHero} className={classes.hero} alt="Brand Hero" />
        </Grid>
      </Hidden>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.loginForm}
        >
          <Grid item>
            <LoginFormComp />
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackBarOpen}
          autoHideDuration={10000}
          onClose={handleSnackBarClose}
        >
          <React.Fragment>
            {apistate.apierror && (
              <Alert severity="error">{apistate.apierror}</Alert>
            )}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        </Snackbar>
      </Grid>
    </Grid>
  );
}