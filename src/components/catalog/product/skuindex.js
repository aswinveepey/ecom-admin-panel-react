import React from "react"
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import EditIcon from "@material-ui/icons/Edit";
import SkuDetailComp from "./skudetail"


export default function SKUIndeComp(props){
  const [skuDetailOpen, setSkuDetailOpen] = React.useState(false);

  //open Product Detail
  const openSkuDetail = (event) => {
    event.preventDefault();
    setSkuDetailOpen(true);
  };

  const closeSkuDetail=()=>{
    setSkuDetailOpen(false);
  }
  return (
    <React.Fragment>
      <TableContainer>
        <Button
          color="primary"
          variant="outlined"
          aria-label="add"
          onClick={openSkuDetail}
        >
          Add SKU
        </Button>
        <Table size="small" aria-label="skus">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>MRP</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.map((sku) => (
              <TableRow key={sku.shortid}>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={openSkuDetail}
                    aria-label="sku detail"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{sku.shortid}</TableCell>
                <TableCell>{sku.name}</TableCell>
                <TableCell>{sku.price?.mrp?.$numberDecimal}</TableCell>
                <TableCell>{sku.price?.sellingprice?.$numberDecimal}</TableCell>
                <TableCell>{sku.status ? "Active" : "Inactive"}</TableCell>
                <TableCell>{sku.createdat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {skuDetailOpen && (
        <SkuDetailComp open={skuDetailOpen} handleClose={closeSkuDetail} />
      )}
    </React.Fragment>
  );
}