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
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
//icon imports - Material UI
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import OrderitemIndexComp from "./orderitemindex";
import OrderDetailComp from "./orderdetail";

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
        <TableCell>{row.shortid}</TableCell>
        <TableCell>
          {row.customer.customer.shortid}
          <br />
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={orderExpand} timeout="auto" unmountOnExit>
            {/* <Box margin={1}> */}
            <Typography variant="subtitle2" gutterBottom component="div">
              Order items
            </Typography>
            {row.orderitems && (
              <OrderitemIndexComp data={row.orderitems} order_id={row._id} />
            )}
            {/* Order item Component */}
            {/* </Box> */}
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
  //get data from props
  React.useEffect(()=>{
    props.data && setRowData(props.data)
    props.newOrder && setOrderDetailOpen(props.newOrder);
  },[props])

  return (
    <React.Fragment>
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
