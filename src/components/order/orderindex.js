import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
import OrderitemIndexComp from "./orderitemindex";
import OrderDetailComp from "./orderdetail";
//<aterial UI
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
// import LinearProgress from "@material-ui/core/LinearProgress";
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

//icon imports - Material UI
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchIcon from "@material-ui/icons/Search";
//Styles
import { makeStyles } from "@material-ui/core/styles";

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
  const openOrderDetail = (event) => {
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
            onClick={openOrderDetail}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>{row._id}</TableCell>
        <TableCell>{row.customer.customer._id}</TableCell>
        <TableCell>{parseFloat(row.amount.amount || 0).toFixed(2)}</TableCell>
        <TableCell>{parseFloat(row.amount.discount || 0).toFixed(2)}</TableCell>
        <TableCell>{parseFloat(row.amount.totalamount || 0).toFixed(2)}</TableCell>
        <TableCell>{parseFloat(row.amount.installation || 0).toFixed(2)}</TableCell>
        <TableCell>{parseFloat(row.amount.shipping || 0).toFixed(2)}</TableCell>
        <TableCell>{row.createdat}</TableCell>
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
  // const [loading, setLoading] = React.useState(true);
  const token = Cookies.get("token");

  //open Order Detail
  const openOrderDetail = (data) => {
    setOrderDetailData(data);
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
    const abortController = new AbortController();
    const signal = abortController.signal;
    let requestOptions = {}
    let fetchurl = ""
    if(orderSearch){
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ searchString: orderSearch }),
      };
      fetchurl = BASE_URL + "order/search"
    } else {
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      fetchurl = BASE_URL + "order";
    }
    //set request options
    //fetch data and set data
    fetch(fetchurl, requestOptions, { signal: signal })
      .then(async (data) => {
        const response = await data.json();
        const { status } = data;
        // setLoading(false);
        status === 200 && setRowData(response.data);
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [token, orderSearch]);

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
                  <TableCell className={classes.tableheader}>Customer ID</TableCell>
                  <TableCell className={classes.tableheader}>Amount</TableCell>
                  <TableCell className={classes.tableheader}>Discount</TableCell>
                  <TableCell className={classes.tableheader}>Total</TableCell>
                  <TableCell className={classes.tableheader}>Installation</TableCell>
                  <TableCell className={classes.tableheader}>Shipping</TableCell>
                  <TableCell className={classes.tableheader}>Created At</TableCell>
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
