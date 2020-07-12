import React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete";
//Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tablecell: {
    minWidth: 250,
  },
  addSkuButton:{
    marginTop:10
  }
}));

export default function OrderitemDetailComp(props) {
  const classes = useStyles();
  const [orderStatuses, setOrderStatuses] = React.useState([
    { value: "Booked", label: "Booked" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
    { value: "Returned", label: "Returned" },
    { value: "Partial Delivery", label: "Partial Delivery" },
  ]); 

  //quantty component change hadling
  const onchangeItem = (index, event) => {
    event.preventDefault()
    const value = event.target.value;
    const name = event.target.name;
    props.onchangeItem(index, name, value);
  };
  const onchangeItemQuantity = (index, event) => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    props.onchangeItemQuantity(index, name, value);
  };
  return (
    <React.Fragment>
      {!props.data?._id && (
        <Button
          color="primary"
          variant="outlined"
          aria-label="add"
          className={classes.addSkuButton}
          // onClick={openOrderDetail}
        >
          Add SKU
        </Button>
      )}
      <TableContainer>
        <Table size="small" aria-label="orderitems" className={classes.table}>
          <TableHead>
            <TableRow>
              {!props.data?._id && <TableCell></TableCell>}
              <TableCell className={classes.tablecell}>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Selling Price</TableCell>
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
            {props.data?.orderitems?.map((orderitem, index) => (
              <TableRow key={orderitem.shortid}>
                {!props.data?._id && (
                  <TableCell>
                    <IconButton
                      size="small"
                      aria-label="order detail"
                      // onClick={openOrderDetail}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
                <TableCell
                  className={classes.tablecell}
                  component="th"
                  scope="row"
                >
                  {orderitem.sku?.product?.name + " " + orderitem.sku?.name}
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    value={orderitem.status || ""}
                    // label="type"
                    name="status"
                    variant="standard"
                    fullWidth
                    onChange={onchangeItem.bind(this, index)}
                  >
                    {orderStatuses.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  {parseFloat(orderitem.sku?.price?.mrp).toFixed(2)}
                </TableCell>
                <TableCell>
                  {parseFloat(orderitem.sku?.price?.sellingprice).toFixed(2)}
                </TableCell>
                <TableCell>
                  <TextField
                    disabled={props.data?._id ? true : false}
                    variant="outlined"
                    name="booked"
                    fullWidth
                    required
                    onChange={onchangeItemQuantity.bind(this, index)}
                    value={orderitem.quantity?.booked || ""}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    name="confirmed"
                    fullWidth
                    required
                    onChange={onchangeItemQuantity.bind(this, index)}
                    value={orderitem.quantity?.confirmed || ""}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    name="shipped"
                    fullWidth
                    required
                    onChange={onchangeItemQuantity.bind(this, index)}
                    value={orderitem.quantity?.shipped || ""}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    name="delivered"
                    fullWidth
                    required
                    onChange={onchangeItemQuantity.bind(this, index)}
                    value={orderitem.quantity?.delivered || ""}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="outlined"
                    name="returned"
                    fullWidth
                    required
                    onChange={onchangeItemQuantity.bind(this, index)}
                    value={orderitem.quantity?.returned || ""}
                  />
                </TableCell>
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