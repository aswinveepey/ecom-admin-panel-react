import React from "react"
import Backdrop from "@material-ui/core/Backdrop"
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function LoaderComp(){
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}