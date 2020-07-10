import React from "react";
//cookie library import
import DataTableComp from "../common/datatable";
import AccountDetailComp from "./accountdetail";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

export default function AccountIndexComp(props) {
  // const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const [accountSearch, setAccountSearch] = React.useState("");

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
        valueGetter: (params) => params.data?.type,
      },
      {
        headerName: "GSTIN",
        valueGetter: (params) => params.data?.gstin,
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
      {
        headerName: "Last Updated At",
        valueGetter: (params) => params.data?.updatedat,
      },
    ],
  };

  //handle double click
  function handleRowDoubleClick(row) {
    setDialogData(row.data);
    setOpenDialog(true);
  }

  //new account
  function handleNewClick() {
    setDialogData([]);
    setOpenDialog(true);
  }

  function handleDialogClose() {
    setOpenDialog(false);
  }
  //handle search input
  function onchangeSearchInput(event){
    setAccountSearch(event.target.value)
  }
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    let requestOptions = {}
    let fetchurl = ""
    if(accountSearch){
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ searchString: accountSearch }),
      };
      fetchurl = BASE_URL + "account/search"
    } else {
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      fetchurl = BASE_URL + "account";
    }
    //set request options
    //fetch data and set data
    fetch(fetchurl, requestOptions, { signal: signal })
      .then(async (data) => {
        const response = await data.json();
        const { status } = data;
        // setLoading(false);
        status === 200 && setRowData(response.data);
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [token, accountSearch]);
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title="Accounts"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
        onchangeSearchInput={onchangeSearchInput}
      />
      <AccountDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  );
}
