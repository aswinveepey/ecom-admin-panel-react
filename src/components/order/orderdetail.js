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
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import { BASE_URL } from "../../constants";
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
  const onchangeAmount = async (event)=>{
    props.onchangeAmount(event)
  }
  return (
    <Table size="small">
      <TableBody className={classes.totaltable}>
        <TableRow>
          <TableCell>
            <strong>Amount</strong>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              name="amount"
              disabled
              fullWidth
              // onChange={onchangeAmount}
              value={parseFloat(props.data?.amount || 0).toFixed(2)}
            />
          </TableCell>
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
              onChange={onchangeAmount}
              value={parseFloat(props.data?.discount || 0).toFixed(2)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Total</strong>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              name="totalamount"
              fullWidth
              disabled
              // onChange={onchangeAmount}
              value={parseFloat(props.data?.totalamount || 0).toFixed(2)}
            />
          </TableCell>
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
              onChange={onchangeAmount}
              value={parseFloat(props.data?.installation || 0).toFixed(2)}
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
              onChange={onchangeAmount}
              value={parseFloat(props.data?.shipping || 0).toFixed(2)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Payable</strong>
          </TableCell>
          <TableCell>
            <TextField
              variant="outlined"
              name="payable"
              fullWidth
              disabled
              // onChange={onchangeAmount}
              value={(
                parseFloat(props.data?.shipping || 0) +
                parseFloat(props.data?.totalamount || 0) +
                parseFloat(props.data?.installation || 0)
              ).toFixed(2)}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}


export default function OrderDetailcomp(props){
  const classes = useStyles();
  const token = Cookies.get("token");
  // const token = Cookies.get("token");

  const [open, setOpen] = React.useState(false);
  const [formControls, setFormControls] = React.useState({});
  const [calculateTotals, setCalculateTotals] = React.useState(false);

  //get open state from props
  React.useEffect(() => {
    setOpen(props.open);
    props.data && setFormControls(props.data);
  }, [props]);

  //delegate close behaviour to parent
  const handleClose = () => {
    props.handleClose();
  };
  //Calculate totals based on changes use effect will trigger on form control update
  React.useEffect(()=>{
    const controls = { ...formControls };
    let orderAmount = 0;
    let orderShipping = 0;
    let orderInstallation = 0;
    if(controls.orderitems){
      controls.orderitems.map((item) => {
        item.amount = item.amount || {};
        const currentQty =
          item.quantity.delivered ||
          item.quantity.shipped ||
          item.quantity.confirmed ||
          item.quantity.booked ||
          0;
        item.amount.amount = (item.sku?.price?.sellingprice || 0) * currentQty;
        item.amount.discount = (item.sku?.price?.discount || 0) * currentQty;
        item.amount.totalamount = item.amount.amount - item.amount.discount;
        item.amount.shipping =
          (item.sku?.price?.shippingcharges || 0) * currentQty;
        item.amount.installation =
          (item.sku?.price?.installationcharges || 0) * currentQty;
        orderAmount += item.amount.totalamount;
        orderShipping += item.amount.shipping;
        orderInstallation += item.amount.installation;
      });
      controls.amount = controls.amount || {};
      controls.amount.amount = orderAmount;
      controls.amount.shippping = controls.amount.shipping || orderShipping;
      controls.amount.installation =
        controls.amount.installation || orderInstallation;
      setFormControls(controls);
    }
  },[calculateTotals])

  //handle item quantity changes
  const onchangeItemQuantity = (index, name, value) => {
    const controls = { ...formControls };
    controls.orderitems[index].quantity = controls.orderitems[index].quantity || {};
    controls.orderitems[index].quantity[name] = value;
    setFormControls(controls);
    // calculateTotals();
    setCalculateTotals(!calculateTotals);
  }
  //handle item status changes
  const onchangeItem = (index, name, value) => {
    const controls = { ...formControls };
    controls.orderitems[index][name] = value;
    setFormControls(controls);
  };
  //handle SKU addition
  const handleAddSku = (sku)=>{
    const controls = { ...formControls };
    controls.orderitems = controls.orderitems || []
    const newItem = {
      sku: sku,
      quantity: {
        booked: sku.quantityrules.minorderqty,
      },
      status: "Booked",
    };
    controls.orderitems.push(newItem)
    setFormControls(controls)
    setCalculateTotals(!calculateTotals);
    // calculateTotals()
  }
  //handle SKU deletion
  const removeOrderItem = (index)=>{
    const controls = { ...formControls };
    controls.orderitems.splice(index,1)
    setFormControls(controls);
    calculateTotals();
  }
  //handle item amount changes
  const onchangeAmount = (event)=>{
    const name = event.target.name
    const value = event.target.value
    const controls = { ...formControls };
    controls.amount = controls.amount || {};
    controls.amount[name] = value;
    controls.amount.totalamount = controls.amount.amount - controls.amount.discount;
    controls.amount.payable = controls.amount.totalamount +
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
  //open select customer menu
  const onSelectCustomer = (customer) => {
    const controls = { ...formControls };
    controls.customer = controls.customer || {}
    controls.customer.customer = customer
    controls.customer.deliveryaddress = customer.address[0];
    controls.customer.billingaddress = customer.address[0];
    setFormControls(controls);
  };
  //handle submit
  const handleSubmit = () => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formControls),
    };
    //differentiate between update & create
    const SUFFIX_URL = formControls?._id
      ? "order/id/" + formControls?._id
      : "order/";
    //POST category data and handle
    fetch(BASE_URL + SUFFIX_URL, requestOptions, {
      signal: signal,
    })
      .then(async (data) => {
        // const response = await data.json();
        const { status } = data;
        if (status === 200) {
          handleClose();
        }
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }
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
              onSelectCustomer={onSelectCustomer}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <OrderitemDetailComp
              data={formControls}
              onchangeItemQuantity={onchangeItemQuantity}
              onchangeItem={onchangeItem}
              onAddSku={handleAddSku}
              removeOrderItem={removeOrderItem}
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