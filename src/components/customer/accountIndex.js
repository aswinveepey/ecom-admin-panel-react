import React from "react";
//cookie library import
import DataTableComp from "../common/datatable";
import AccountDetailComp from "./accountdetail";
import AccountApi from "../../api/account";

export default function AccountIndexComp(props) {
  // const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const [accountSearch, setAccountSearch] = React.useState("");


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
    const accountApi = new AccountApi();
    const abortController = new AbortController();
    const signal = abortController.signal;

    if(accountSearch){
      accountApi
        .searchAccounts(signal, accountSearch)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }else{
      accountApi
        .getAccounts(signal)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [accountSearch]);
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
