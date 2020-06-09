import React from 'react'
import AppBarComp from "../common/appbar";
import { LinearProgress, Grid, Paper, Typography } from "@material-ui/core";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

class OrderIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fetchStatus: 'fetched',

    }
  }
  render(){
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
    return (
      <div>
        <AppBarComp title="Orders" />
        {this.state.fetchStatus === "loading" && (
          <LinearProgress color="secondary" />
        )}
        {this.state.fetchStatus === "fetched" && (
          <Paper className="paper-container" elevation={3}>
            <Grid container direction="column">
              <Grid item>
                <Grid container style={{ padding: "15px" }}>
                  <Grid item>
                    <Typography variant="h6">Manager Orders</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <div className="ag-theme-material">
                  <AgGridReact
                    gridOptions={gridData.gridOptions}
                    columnDefs={gridData.columnDefs}
                    rowData={gridData.rowData}
                  ></AgGridReact>
                </div>
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
    );
  }
}
export default OrderIndex;