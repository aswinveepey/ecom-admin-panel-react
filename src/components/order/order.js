import React, {Suspense} from "react";
import { useSelector } from "react-redux";

import moment from "moment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { makeStyles } from "@material-ui/core/styles";

//picker import
import {MuiPickersUtilsProvider, DateTimePicker} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

//import order api class
import OrderService from "../../services/order";

const OrderIndexComp = React.lazy(() => import("./orderindex"));
const OrderItemIndexComp = React.lazy(() => import("./orderitemindex"));

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "1%",
  },
  searchbar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // marginLeft: "1%",
    marginBottom: "1%",
  },
  searchinput: {
    width: "100%",
  },
  container: {
    height: "inherit",
    marginLeft: "1%",
  },
}));

export default function OrderComp(props) {
  const classes = useStyles();
  const orderUpdateState = useSelector((state) => state.orderUpdateReducer);

  const [orderData, setOrderData] = React.useState([]);
  const [bookedData, setBookedData] = React.useState([]);
  const [confirmedData, setConfirmedData] = React.useState([]);
  const [shippedData, setShippedData] = React.useState([]);
  const [processedData, setProcessedData] = React.useState([]);
  const [orderSearch, setOrderSearch] = React.useState("");
  const [orderDetailOpen, setOrderDetailOpen] = React.useState(false);
  const [orderFilterStartDate, setOrderFilterStartDate] = React.useState(moment().subtract(5, "days"))
  const [orderFilterEndDate, setOrderFilterEndDate] = React.useState(moment());
  const [tabValue, setTabValue] = React.useState(0);

  //handle Order Search
  const handleOrderSearch = (event) => {
    setOrderSearch(event.target.value);
  };
  //open Order Detail
  const createOrder = () => {
    setOrderDetailOpen(true);
  };
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const orderService = new OrderService();
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (orderSearch.length > 3) {
      orderService
        .searchOrders(signal, orderSearch)
        .then((response) => setOrderData(response))
        .catch((err) => {
          console.log(err);
        });
    } else {
      orderService
        .getOrders(
          signal,
          moment.utc(orderFilterStartDate).format(),
          moment.utc(orderFilterEndDate).format()
        )
        .then((response) => setOrderData(response))
        .catch((err) => {
          console.log(err);
        });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [orderSearch, orderFilterStartDate, orderFilterEndDate, orderUpdateState]);

  React.useEffect(() => {
    let orderdetailArray = []
    orderData.map((order) =>
      orderdetailArray.push(...order.orderitems)
    );
    setBookedData(orderdetailArray.filter(item=>item.status==="Booked"))
    setConfirmedData(orderdetailArray.filter(item=>item.status==="Confirmed"))
    setShippedData(orderdetailArray.filter(item=>item.status==="Shipped"))
    // setBookedData(orderdetailArray.filter(item=>item.status==="Booked"))
    //set booked data
    //set confirmed data
    //set shipped data
  }, [orderData]);
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        aria-label="add"
        color="secondary"
        className={classes.button}
        onClick={createOrder}
      >
        Add Order
      </Button>
      {/* <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<PublishIcon />}
      >
        Export
      </Button> */}
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          inputVariant="outlined"
          variant="inline"
          label="Start Date"
          value={orderFilterStartDate}
          onChange={setOrderFilterStartDate}
          className={classes.button}
        />
        <DateTimePicker
          inputVariant="outlined"
          variant="inline"
          label="End Date"
          value={orderFilterEndDate}
          onChange={setOrderFilterEndDate}
          className={classes.button}
        />
      </MuiPickersUtilsProvider>
      <div className={classes.container}>
        <Paper component="form" className={classes.searchbar}>
          <InputBase
            placeholder="Search Orders"
            className={classes.searchinput}
            onChange={handleOrderSearch}
          />
          <IconButton type="submit" aria-label="search orders">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable customer tabs"
        >
          <Tab label="Orders" />
          <Tab label="Booked" />
          <Tab label="Confirmed" />
          <Tab label="Shipped" />
          {/* <Tab label="Processed" /> */}
        </Tabs>
        <Suspense fallback={<div>Loading...</div>}>
          {tabValue === 0 && (
            <OrderIndexComp data={orderData} newOrder={orderDetailOpen} />
          )}
          {tabValue === 1 && <OrderItemIndexComp data={bookedData} />}
          {tabValue === 2 && <OrderItemIndexComp data={confirmedData} />}
          {tabValue === 3 && <OrderItemIndexComp data={shippedData} />}
          {/* {tabValue === 4 && <OrderItemIndexComp data={processedData} />} */}
        </Suspense>
      </div>
    </React.Fragment>
  );
}
