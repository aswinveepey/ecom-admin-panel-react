import React, { Suspense } from "react";
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
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
//Component import
const OrderitemDetailComp = React.lazy(() => import("./orderitemdetail"));
const CustomerDisplayComp = React.lazy(() => import("./ordercustomercomp"));


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
  totaltable:{
    float:"right"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrdertotalComp(props){
  const classes = useStyles();
  return (
    <Table size="small">
      <TableBody className={classes.totaltable}>
        <TableRow>
          <TableCell>
            <strong>Amount</strong>
          </TableCell>
          <TableCell>{parseFloat(props.data.amount).toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Discount</strong>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              name="discount"
              fullWidth
              onChange={props.onchangeAmount}
              value={parseFloat(props.data.discount).toFixed(2)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Total</strong>
          </TableCell>
          <TableCell>{parseFloat(props.data.totalamount).toFixed(2)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Installation</strong>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              name="installation"
              fullWidth
              onChange={props.onchangeAmount}
              value={parseFloat(props.data.installation).toFixed(2)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Shipping</strong>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              name="shipping"
              fullWidth
              onChange={props.onchangeAmount}
              value={parseFloat(props.data.shipping).toFixed(2)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Payable</strong>
          </TableCell>
          <TableCell>
            {(
              parseFloat(props.data.shipping) +
              parseFloat(props.data.totalamount) +
              parseFloat(props.data.installation)
            ).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}


export default function OrderDetailcomp(props){
  const classes = useStyles();
  // const token = Cookies.get("token");

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
  //handle item quantity changes
  const onchangeItem = (index, name, value) => {
    const controls = { ...formControls };
    controls.orderitems[index][name] = value;
    setFormControls(controls);
  };
  //handle item amount changes
  const onchangeAmount = (event)=>{
    const name = event.target.name
    const value = event.target.value
    const controls = { ...formControls };
    controls.amount[name] = value;
    controls.amount.totalamount =
      controls.amount.amount - controls.amount.discount;
    controls.amount.payable =
      controls.amount.totalamount +
      controls.amount.installation +
      controls.amount.shipping;
    setFormControls(controls);
  }
  //on address change set corresponding address to the selected customer address using index
  const changeAddress = (address, addressType)=>{
    const controls = { ...formControls };
    controls.customer[addressType] = address;
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
          <Suspense fallback={<div>Loading...</div>}>
            <CustomerDisplayComp
              data={formControls.customer}
              changeAddress={changeAddress}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <OrderitemDetailComp
              data={formControls.orderitems}
              onchangeItemQuantity={onchangeItemQuantity}
              onchangeItem={onchangeItem}
            />
          </Suspense>
          <OrdertotalComp
            data={formControls.amount}
            onchangeAmount={onchangeAmount}
          />
        </Paper>
      </Dialog>
    </React.Fragment>
  );
}