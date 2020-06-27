import React from "react";
import CustomerDetailComp from "./customerdetail";
import DataTableComp from '../common/datatable'
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";


export default function CustomerIndexComp(props){
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const token = Cookies.get("token");
  const gridData = {
    gridOptions: {
      rowSelection: "multiple",
      onRowDoubleClicked: props.handleRowDoubleClick,
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
  //fetch data
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
    fetch(BASE_URL + "customer/", requestOptions, { signal: signal })
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
  }, [token, openDialog]);
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title = "Customers"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
      />
      <CustomerDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  ); 
}
