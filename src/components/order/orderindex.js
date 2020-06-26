import React from 'react'
import AppBarComp from "../common/appbar";
import Paper from '@material-ui/core/Paper'

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  raisedpaper: {
    top: "-18vh",
    position: "relative",
    margin: "2%",
    padding: "1%",
  },
}));

const gridData = {
  gridOptions: {
    rowSelection: "multiple",
    pagination: true,
    defaultColDef: {
      resizable: true,
      filter: true,
      sortable: true,
    },
  },
  columnDefs: [
    { field: "id", headerName: "Order ID", checkboxSelection: true },
    { field: "title", headerName: "Product Name" },
    { field: "customer", headerName: "Customer" },
    { field: "mobnumber", headerName: "Mobile Number" },
    { field: "quantity", headerName: "Quantity" },
    { field: "amount", headerName: "Amount" },
    { field: "discount", headerName: "Discount" },
    { field: "totalamount", headerName: "Total Amount" },
    { field: "status", headerName: "Status" },
    { field: "created_time", headerName: "Order Time" },
    { field: "executive", headerName: "Delivery Executive" },
  ],
  rowData: [
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
    {
      id: 0,
      title: "Aspic - Light",
      customer: "Customer 1",
      mobnumber: "9895222313",
      quantity: "23",
      amount: "1234.56",
      discount: "34.56",
      totalamount: "1200.00",
      status: "Fulfilled",
      created_time: Date.now(),
      executive: "Remesh",
    },
  ],
};

export default function OrderIndex(props){
  const classes = useStyles();
  return (
    <div>
      <AppBarComp title="Orders" />
      <Paper className={classes.raisedpaper}>
        <div className="ag-theme-material">
          <AgGridReact
            gridOptions={gridData.gridOptions}
            columnDefs={gridData.columnDefs}
            rowData={gridData.rowData}
          ></AgGridReact>
        </div>
      </Paper>
    </div>
  );
};