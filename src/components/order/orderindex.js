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
      indexFlag: true,
      createFlag: false,
      editFlag: false
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
        { field: "mob_number", headerName: "Mobile Number" },
        { field: "quantity", headerName: "Quantity" },
        { field: "amount", headerName: "Amount" },
        { field: "discount", headerName: "Discount" },
        { field: "total_amount", headerName: "Total Amount" },
        { field: "status", headerName: "Status" },
        { field: "created_time", headerName: "Order Time" },
        { field: "executive", headerName: "Delivery Executive" },
      ],
      rowData: [
        { id: 0, title: "Aspic - Light" },
        { id: 1, title: "Wine - Tribal Sauvignon" },
        { id: 2, title: "Mayonnaise - Individual Pkg" },
        { id: 3, title: "Cookies - Englishbay Oatmeal" },
        { id: 4, title: "Coffee Decaf Colombian" },
        { id: 5, title: "Truffle Paste" },
        { id: 6, title: "Beef - Top Sirloin - Aaa" },
        { id: 7, title: "Pork - Chop, Frenched" },
        { id: 8, title: "Flour - Buckwheat, Dark" },
        { id: 9, title: "Flour - Buckwheat, Dark" },
        { id: 10, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
      ],
    };
    return (
      <div>
        <AppBarComp title="Orders" />
        {this.state.indexFlag && (
          <Paper
            className="paper-container"
            elevation={3}
          >
            <Grid container direction="column">
              <Grid item>
                <Grid container style={{ padding: "15px" }}>
                  <Grid item>
                    <Typography variant="h6">Manager Orders</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <div
                  className="ag-theme-material"
                >
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