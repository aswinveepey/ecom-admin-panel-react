import React from "react";

import CustomerDetailComp from "./customerdetail";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
//core imports - Material UI
import LinearProgress from '@material-ui/core/LinearProgress'
import Fab from "@material-ui/core/Fab";
//icon imports - Material UI
import AddIcon from "@material-ui/icons/Add";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


export default function CustomerIndexComp(props){
  const [rowData, setRowData] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const token = Cookies.get("token");
  const gridData = {
    gridOptions: {
      rowSelection: "multiple",
      onRowDoubleClicked: handleRowDoubleClick,
      pagination: true,
      defaultColDef: {
        resizable: true,
        filter: true,
        sortable: true,
      },
    },
    columnDefs: [
      {
        headerName: "Name",
        valueGetter: (params) =>
          params.data?.firstname + " " + params.data?.lastname,
      },
      {
        headerName: "Gender",
        valueGetter: (params) => params.data?.gender,
      },
      {
        headerName: "Type",
        valueGetter: (params) => params.data?.type,
      },
      {
        headerName: "Account",
        cellRenderer: (params) =>
          params.data.account &&
          '<a href="#account">' + params.data.account.name + "</a>",
      },
      {
        headerName: "Username",
        valueGetter: (params) => params.data?.auth?.username,
      },
      {
        headerName: "Email",
        valueGetter: (params) => params.data?.auth?.email,
      },
      {
        headerName: "Mob Number",
        valueGetter: (params) => params.data?.auth?.mobilenumber,
      },
      {
        headerName: "Status",
        valueGetter: (params) =>
          params.data?.auth?.status === true ? "Active" : "Inactive",
      },
    ],
  };
  //handle double click
  function handleRowDoubleClick(row) {
    setDialogData(row.data);
    setOpenDialog(true);
  }
  function handleNewCustomerClick(row) {
    setDialogData([]);
    setOpenDialog(true);
  }
  function handleDialogClose(){
    setOpenDialog(false);
  }
  //fetch data
  React.useEffect(() => {
    setLoading(true);
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    //fetch data and set data
    fetch(BASE_URL + "customer/", requestOptions, { signal: signal })
      .then(async (data) => {
        const response = await data.json();
        const { status } = data;
        status === 200 && setRowData(response.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
    return function cleanup() {
      abortController.abort();
    };
  }, [token, openDialog]);
  //return component
  return (
    <div className="ag-theme-material">
      {loading && <LinearProgress color="secondary" />}
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        className="adduserfab"
        onClick={handleNewCustomerClick}
      >
        <AddIcon />
      </Fab>
      <AgGridReact
        gridOptions={gridData.gridOptions}
        columnDefs={gridData.columnDefs}
        rowData={rowData}
      ></AgGridReact>
      <CustomerDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </div>
  ); 
}
