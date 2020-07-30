import React from "react";
import moment from "moment"
//material UI
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
//picker import
// import DateTimePicker from "@material-ui/pickers/DateTimePicker";
import {MuiPickersUtilsProvider, DateTimePicker} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
//icon imports - Material UI
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchIcon from "@material-ui/icons/Search";
//Styles
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import OrderitemIndexComp from "./orderitemindex";
import OrderDetailComp from "./orderdetail";
//import order api class
import OrderService from "../../services/order";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "1%",
  },
  table: {
    minWidth: 700,
  },
  tablegrid: {
    overflow: "auto",
  },
  tablerow: {
    height: "50",
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableheader: {
    fontWeight: "600",
    fontSize: "12px",
    color: "rgba(0, 0, 0, 0.54)",
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
function ExpandableRow(props) {
  const classes = useStyles();
  const { row } = props;
  const [orderExpand, setOrderExpand] = React.useState(false);

  //open Order Detail
  const openOrderDetail = (row, event) => {
    event.preventDefault();
    props.openOrderDetail(row);
  };
  return (
    <React.Fragment>
      <TableRow key={row.shortid} className={classes.tablerow}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOrderExpand(!orderExpand)}
          >
            {orderExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            size="small"
            aria-label="order detail"
            onClick={openOrderDetail.bind(this, row)}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>{row._id}</TableCell>
        <TableCell>
          {row.customer.customer._id}
          <br/>
          {[
            row.customer.customer.firstname,
            row.customer.customer.lastname,
          ].join(" ")}
        </TableCell>
        <TableCell>{parseFloat(row.amount.amount || 0).toFixed(2)}</TableCell>
        <TableCell>{parseFloat(row.amount.discount || 0).toFixed(2)}</TableCell>
        <TableCell>
          {parseFloat(row.amount.totalamount || 0).toFixed(2)}
        </TableCell>
        <TableCell>
          {parseFloat(row.amount.installation || 0).toFixed(2)}
        </TableCell>
        <TableCell>{parseFloat(row.amount.shipping || 0).toFixed(2)}</TableCell>
        <TableCell>{moment(row.createdat).format("LLLL")}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={orderExpand} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle2" gutterBottom component="div">
                Order items
              </Typography>
              {row.orderitems && (
                <OrderitemIndexComp data={row.orderitems} order_id={row._id} />
              )}
              {/* Order item Component */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function OrderIndexComp(props) {
  const classes = useStyles();
  const [rowData, setRowData] = React.useState([]);
  const [orderDetailOpen, setOrderDetailOpen] = React.useState(false);
  const [orderDetailData, setOrderDetailData] = React.useState([]);
  const [orderSearch, setOrderSearch] = React.useState("");
  const [orderFilterStartDate, setOrderFilterStartDate] = React.useState(moment().subtract(5, "days"))
  const [orderFilterEndDate, setOrderFilterEndDate] = React.useState(moment())
  const state = useSelector((state) => state.orderUpdateReducer);

  //open Order Detail
  const openOrderDetail = (detailData) => {
    //this step is important in preventing circular json issue & synthetic event issue
    detailData._id && setOrderDetailData(detailData);
    setOrderDetailOpen(true);
  };
  //close Order Detail
  const closeOrderDetail = () => {
    setOrderDetailOpen(false);
  };
  //handle Order Search
  const handleOrderSearch = (event) => {
    setOrderSearch(event.target.value);
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
        .then((response) => setRowData(response))
        .catch((err) => {
          console.log(err);
        });
    } else {
      orderService
        .getOrders(signal, orderFilterStartDate, orderFilterEndDate)
        .then((response) => setRowData(response))
        .catch((err) => {
          console.log(err);
        });
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [orderSearch, state, orderFilterStartDate, orderFilterEndDate]);

  return (
    <React.Fragment>
      <Button
        color="primary"
        variant="outlined"
        aria-label="add"
        className={classes.button}
        onClick={openOrderDetail}
      >
        Add Order
      </Button>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          inputVariant="outlined"
          variant="inline"
          value={orderFilterStartDate}
          onChange={setOrderFilterStartDate}
          className={classes.button}
        />
        <DateTimePicker
          inputVariant="outlined"
          variant="inline"
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
        <TableContainer>
          {rowData && (
            <Table aria-label="order table" className={classes.table}>
              <TableHead>
                <TableRow className={classes.tablerow}>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className={classes.tableheader}>Id</TableCell>
                  <TableCell className={classes.tableheader}>
                    Customer
                  </TableCell>
                  <TableCell className={classes.tableheader}>Amount</TableCell>
                  <TableCell className={classes.tableheader}>
                    Discount
                  </TableCell>
                  <TableCell className={classes.tableheader}>Total</TableCell>
                  <TableCell className={classes.tableheader}>
                    Installation
                  </TableCell>
                  <TableCell className={classes.tableheader}>
                    Shipping
                  </TableCell>
                  <TableCell className={classes.tableheader}>
                    Created At
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map((row) => (
                  <ExpandableRow
                    key={row._id}
                    row={row}
                    openOrderDetail={openOrderDetail}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
      {orderDetailOpen && (
        <OrderDetailComp
          open={orderDetailOpen}
          handleClose={closeOrderDetail}
          data={orderDetailData}
        />
      )}
    </React.Fragment>
  );
}
