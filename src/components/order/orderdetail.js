import React, { Suspense } from "react";
import Cookies from "js-cookie";
//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
//Constants Import
import { BASE_URL } from "../../constants";
//Component import
// import OrderitemDetailComp from "./orderitemdetail";

const OrderitemDetailComp = React.lazy(() => import("./orderitemdetail"));
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  gridpaper: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    // overflow: "scroll",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CustomerDisplayComp(props){
  return (
    <Grid container spacing={1}>
      <Grid item md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Customer Details
            </Typography>
            <Typography variant="h5" component="h2">
              {props.data?.customer?.firstname +
                " " +
                props.data.customer?.lastname}
            </Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>{props.data?.customer?._id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Contact No</TableCell>
                  <TableCell>{props.data?.customer?.contactnumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Account</TableCell>
                  <TableCell>{props.data?.customer?.account?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Primary No</TableCell>
                  <TableCell>
                    {props.data?.customer?.auth?.mobilenumber}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Delivery Address
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.deliveryaddress?.address1}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.deliveryaddress?.address2}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.deliveryaddress?.area}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.deliveryaddress?.landmark}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.deliveryaddress?.district},
              {props.data?.deliveryaddress?.pincode}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.deliveryaddress?.state},
              {props.data?.deliveryaddress?.country}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Change</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Billing Address
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.billingaddress?.address1}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.billingaddress?.address2}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.billingaddress?.area}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.billingaddress?.landmark}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.billingaddress?.district},
              {props.data?.billingaddress?.pincode}
            </Typography>
            <Typography variant="body2" component="p">
              {props.data?.billingaddress?.state},
              {props.data?.billingaddress?.country}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Change</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default function OrderDetailcomp(props){
  const classes = useStyles();
  const token = Cookies.get("token");

  const [open, setOpen] = React.useState(false);
  const [formControls, setFormControls] = React.useState([]);
  //delegate close behaviour to parent
  const handleClose = () => {
    props.handleClose();
  };
  //handle submit
  const handleSubmit = () => {
    console.log(formControls)
  }
  //handle item quantity changes
  const onchangeItemQuantity = (index, name, value) => {
    const controls = { ...formControls };
    controls.orderitems[index].quantity[name] = value;
    setFormControls(controls);
  }
  //get open state from props
  React.useEffect(() => {
    setOpen(props.open);
    props.data && setFormControls(props.data);
  }, [props]);
  //return component
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="subtitle1" className={classes.title}>
              {formControls?._id ? "Edit Order" : "New Order"}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {formControls?._id ? "Save Changes" : "Create Order"}
            </Button>
          </Toolbar>
        </AppBar>
        <Paper className={classes.gridpaper} variant="outlined">
          <CustomerDisplayComp data={formControls.customer} />
          <Suspense fallback={<div>Loading...</div>}>
            <OrderitemDetailComp
              data={formControls.orderitems}
              onchangeItemQuantity={onchangeItemQuantity}
            />
          </Suspense>
        </Paper>
      </Dialog>
    </React.Fragment>
  );
}