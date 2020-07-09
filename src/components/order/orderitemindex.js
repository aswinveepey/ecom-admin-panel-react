import React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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

  return (
    <React.Fragment>
      <TableContainer>
        <Table size="small" aria-label="orderitems" className={classes.table}>
          <TableHead>
            <TableRow>
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
    </React.Fragment>
  );
}
