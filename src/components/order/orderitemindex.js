import React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tablecell: {
    minWidth:250,
  },
}));

export default function OrderitemIndexComp(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer>
        <Table size="small" aria-label="orderitems" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell}>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Booked</TableCell>
              <TableCell>Confirmed</TableCell>
              <TableCell>Shipped</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell>Returned</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.map((orderitem) => (
              <TableRow key={orderitem.shortid}>
                <TableCell className={classes.tablecell} component="th" scope="row">
                  {orderitem.sku?.product?.name + " " + orderitem.sku?.name}
                </TableCell>
                <TableCell>{orderitem.status}</TableCell>
                <TableCell>{orderitem.quantity?.booked}</TableCell>
                <TableCell>{orderitem.quantity?.confirmed}</TableCell>
                <TableCell>{orderitem.quantity?.shipped}</TableCell>
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
