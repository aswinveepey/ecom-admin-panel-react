import React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import OrderitemDetailComp from "./orderitemdetail";
//Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tablecell: {
    minWidth:200,
    // wrap: "true",
  },
}));

export default function OrderitemIndeComp(props) {
  const classes = useStyles();
  const [orderitemDetailOpen, setOrderitemDetailOpen] = React.useState(false);
  const [orderitemDetailData, setOrderitemDetailData] = React.useState([]);

  //open Product Detail
  const openOrderitemDetail = (orderitem, event) => {
    event.preventDefault();
    setOrderitemDetailData(orderitem);
    setOrderitemDetailOpen(true);
  };

  const closeOrderitemDetail = () => {
    setOrderitemDetailOpen(false);
  };
  return (
    <React.Fragment>
      <TableContainer>
        {/* <Button
          color="primary"
          variant="outlined"
          aria-label="add"
          onClick={openOrderitemDetail.bind(this, { order: props.order_id })}
        >
          Add Order 
        </Button> */}
        <Table size="small" aria-label="orderitems" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell className={classes.tablecell}>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Booked Quantity</TableCell>
              <TableCell>Confirmed Quantity</TableCell>
              <TableCell>Delivered Quantity</TableCell>
              <TableCell>Returned Quantity</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.map((orderitem) => (
              <TableRow key={orderitem.shortid}>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={openOrderitemDetail.bind(this, orderitem)}
                    aria-label="orderitem detail"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tablecell}>
                  {orderitem.sku?.product?.name + " " + orderitem.sku?.name}
                </TableCell>
                <TableCell>{orderitem.status}</TableCell>
                <TableCell>{orderitem.quantity?.booked}</TableCell>
                <TableCell>{orderitem.quantity?.confirmed}</TableCell>
                <TableCell>{orderitem.quantity?.delivered}</TableCell>
                <TableCell>{orderitem.quantity?.returned}</TableCell>
                <TableCell>
                  {parseFloat(orderitem.amount?.amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  {parseFloat(orderitem.amount?.discount).toFixed(2)}
                </TableCell>
                <TableCell>
                  {parseFloat(orderitem.amount?.totalamount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {orderitemDetailOpen && (
        <OrderitemDetailComp
          open={orderitemDetailOpen}
          handleClose={closeOrderitemDetail}
          data={orderitemDetailData}
        />
      )}
    </React.Fragment>
  );
}
