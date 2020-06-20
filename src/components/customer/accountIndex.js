import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

//core imports - Material UI
import LinearProgress from '@material-ui/core/LinearProgress'
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
//icon imports - Material UI
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import AccountDetailComp from "./accountdetail";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


const useStyles = makeStyles((theme) => ({
  fab: {
    float: "left",
    position: "relative",
    left: "-1rem",
  },
}));

export default function AccountIndexComp(props) {

  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
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
        valueGetter: (params) => params.data?.name,
      },
      { 
        headerName: "Type", 
        valueGetter: (params) => params.data?.type 
      },
      {
        headerName: "GSTIN",
        valueGetter: (params) => params.data?.primarycontact?.gstin,
      },
      {
        headerName: "Primary Contact",
        valueGetter: (params) => params.data?.primarycontact?.name,
      },
      {
        headerName: "Designation",
        valueGetter: (params) => params.data?.primarycontact?.designation,
      },
      {
        headerName: "Primary Email",
        valueGetter: (params) => params.data?.primarycontact?.email,
      },
      {
        headerName: "Primary Mobile",
        valueGetter: (params) => params.data?.primarycontact?.mobile,
      },
    ],
  };

  //handle double click
  function handleRowDoubleClick(row) {
    setDialogData(row.data);
    setOpenDialog(true);
  }

  //new account
  function handleNewAccountClick() {
    setDialogData([]);
    setOpenDialog(true);
  }

  function handleDialogClose() {
    setOpenDialog(false);
  }

  React.useEffect(() => {
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
    fetch(BASE_URL + "account/", requestOptions, { signal: signal })
      .then(async (data) => {
        const response = await data.json();
        const { status } = data;
        setLoading(false);
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
      <Tooltip title="Add Account">
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={handleNewAccountClick}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {loading === true && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      <AgGridReact
        gridOptions={gridData.gridOptions}
        columnDefs={gridData.columnDefs}
        rowData={rowData}
      ></AgGridReact>
      <AccountDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </div>
  );
}
