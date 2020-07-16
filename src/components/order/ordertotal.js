import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

//styles
const useStyles = makeStyles((theme) => ({
  totaltable:{
    float:"right"
  },
}));

//order total component
export default function OrdertotalComp(props){
  // get styles as classes
  const classes = useStyles();
  //on amount change pass event to parent order detail component
  const onchangeAmount = async (event)=>{
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    props.onchangeAmount(name, value);
  }
  //return table floated right
  //order discount, shipping & installation can be edited from here
  return (
    <Table size="small">
      <TableBody className={classes.totaltable}>
        <TableRow>
          <TableCell>
            <strong>Amount</strong>
          </TableCell>
          {/* amount field - non editable */}
          <TableCell>
            <TextField
              variant="outlined"
              name="amount"
              disabled
              fullWidth
              value={parseFloat(props.data?.amount || 0).toFixed(2)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Discount</strong>
          </TableCell>
          {/* Discount field editable - On edit call handle change amount */}
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
          {/* Total amount - Non editable */}
          <TableCell>
            <TextField
              variant="outlined"
              name="totalamount"
              fullWidth
              disabled
              value={parseFloat(props.data?.totalamount || 0).toFixed(2)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <strong>Installation</strong>
          </TableCell>
          {/* Installation field editable - On edit call handle change amount */}
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
          {/* Shipping field editable - On edit call handle change amount */}
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
          {/* Payable field - dynamic - calculated */}
          <TableCell>
            <TextField
              variant="outlined"
              fullWidth
              disabled
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