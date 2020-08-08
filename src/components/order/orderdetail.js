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
import Paper from "@material-ui/core/Paper";
//import order api class
import OrderService from "../../services/order";
import {useDispatch} from "react-redux"
// import {setOrderUpdate} from "../../actions"

//lazy import component - enables code splitting. Ensure suspense hoc
const OrderitemDetailComp = React.lazy(() => import("./orderitemdetail"));
const CustomerDisplayComp = React.lazy(() => import("./customercomp"));
const SelectSKU = React.lazy(() => import("../common/selectsku"));
const OrdertotalComp = React.lazy(() => import("./ordertotal"));

//styles
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
  },
  addSkuButton:{
    marginTop:10
  }
}));

//dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const orderService = new OrderService();

export default function OrderDetailcomp(props){
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [formControls, setFormControls] = React.useState([]);
  const [calculateTotals, setCalculateTotals] = React.useState(false);
  const [addSkuOpen, setAddSkuOpen] = React.useState(false);

  //get open state from props
  React.useEffect(() => {
    setOpen(props.open);
    props.data && setFormControls(props.data);
  }, [props]);

  //delegate close behaviour to parent
  const handleClose = () => {
    props.handleClose();
  };
  //add sku handling in case of new order
  const onClickAddSku = () => {
    setAddSkuOpen(true);
  };
  //close sku add dialog handling
  const closeAddSku = () => {
    setAddSkuOpen(false);
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
        item.amount.amount = (item.sku?.inventory[0]?.sellingprice || 0) * currentQty;
        item.amount.discount =
          (item.sku?.inventory[0]?.discount || 0) * currentQty;
        item.amount.totalamount = item.amount.amount - item.amount.discount;
        item.amount.shipping =
          (item.sku?.inventory[0]?.shippingcharges || 0) * currentQty;
        item.amount.installation =
          (item.sku?.inventory[0]?.installationcharges || 0) * currentQty;
        orderAmount += item.amount.totalamount;
        orderShipping += item.amount.shipping;
        orderInstallation += item.amount.installation;
        return null;
      });
      controls.amount = controls.amount || {};
      controls.amount.amount = orderAmount;
      controls.amount.discount = controls.amount.discount || 0;
      controls.amount.totalamount = controls.amount.amount - controls.amount.discount;
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
  }
  //handle SKU deletion
  const removeOrderItem = (index)=>{
    const controls = { ...formControls };
    controls.orderitems.splice(index,1)
    setFormControls(controls);
    setCalculateTotals(!calculateTotals);
  }
  //handle item amount changes
  const onchangeAmount = (name, value)=>{
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
    
    if (formControls?._id){
      orderService
        .updateOrder(signal, formControls)
        .then((data) => {
          handleClose();
          dispatch({
            type: "ORDER_UPDATED",
          });
        })
        .catch((err) => console.log(err));
    }else{
      orderService
        .createOrder(signal, formControls)
        .then((data) => {
          handleClose();
          dispatch({
            type: "ORDER_UPDATED",
          });
        })
        .catch((err) => console.log(err));
    }   
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
              data={formControls?.customer}
              changeAddress={changeAddress}
              onSelectCustomer={onSelectCustomer}
            />
          </Suspense>
          {!formControls._id && formControls.customer && (
            <Button
              color="primary"
              variant="outlined"
              aria-label="add"
              className={classes.addSkuButton}
              onClick={onClickAddSku}
            >
              Add SKU
            </Button>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <OrderitemDetailComp
              data={formControls}
              onchangeItemQuantity={onchangeItemQuantity}
              onchangeItem={onchangeItem}
              removeOrderItem={removeOrderItem}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <SelectSKU
              open={addSkuOpen}
              handleClose={closeAddSku}
              selectSku={handleAddSku}
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <OrdertotalComp
              data={formControls?.amount}
              onchangeAmount={onchangeAmount}
            />
          </Suspense>
        </Paper>
      </Dialog>
    </React.Fragment>
  );
}