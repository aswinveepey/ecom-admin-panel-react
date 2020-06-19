import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

import AccountDetailComp from "./accountdetail";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


export default function AccountIndexComp(props) {
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
      { headerName: "Type", valueGetter: (params) => params.data?.type },
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
        status === 200 && setRowData(response.data);
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [token]);
  //return component
  return (
    <div className="ag-theme-material">
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
