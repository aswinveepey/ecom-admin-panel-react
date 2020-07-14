import React from "react";
import CustomerDetailComp from "./customerdetail";
import DataTableComp from '../common/datatable'
import CustomerApi from "../../api/customer";


export default function CustomerIndexComp(props){
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [customerSearch, setCustomerSearch] = React.useState("");
  const customerapi = new CustomerApi();

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
          '<a href="#account" >' + params.data.account.name + "</a>",
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
  function handleNewClick() {
    setDialogData([]);
    setOpenDialog(true);
  }
  function handleDialogClose(){
    setOpenDialog(false);
  }
  //handle search input
  function onchangeSearchInput(event){
    setCustomerSearch(event.target.value)
  }
  //datafetch
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (customerSearch) {
      customerapi
        .searchCustomers(signal, customerSearch)
        .then((response) => setRowData(response));
    } else {
      customerapi.getCustomers(signal).then((response) => setRowData(response));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [customerSearch]);
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title="Customers"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
        onchangeSearchInput={onchangeSearchInput}
      />
      <CustomerDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  ); 
}
