import React from "react";
import Grid from '@material-ui/core/Grid'
import Hidden from "@material-ui/core/Hidden";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import LoginFormComp from './loginform'
import useAPIError from "../../hooks/useapierror";


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

export default function Login(props){
  const classes = useStyles();
  const { error, setError } = useAPIError();
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const tenantHeroFile = "hero-image-hhys.png";
  const tenantHero =
    "https://litcomassets.s3.ap-south-1.amazonaws.com/tenantassets/"+tenantHeroFile;

  const handleSnackBarClose = () => {
    setError({});
    setSnackBarOpen(false);
  };
  React.useEffect(() => {
      error && setSnackBarOpen(true);
  }, [error]);

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
            {error && <Alert severity="error">{error?.message}</Alert>}
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