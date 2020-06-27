import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";
import DataTableComp from "../../common/datatable";
import BrandDetailComp from "./branddetail";

export default function BrandIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);

  const token = Cookies.get("token");
  const gridData = {
    gridOptions: {
      rowSelection: "multiple",
      // rowHeight:50,
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
        headerName: "",
        autoHeight: true,
        cellRenderer: (params) =>
          params.data.assets &&
          '<img width="50" height="50" alt="Brand Logo" src="' +
            params.data.assets.logo +
            '"/>',
      },
      {
        headerName: "Name",
        valueGetter: (params) => params.data?.name,
      },
      {
        headerName: "Manufacturer",
        valueGetter: (params) => params.data?.manufacturer,
      },
      {
        headerName: "Last Updated At",
        valueGetter: (params) => params.data?.updatedat,
      },
    ],
  };
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
    fetch(BASE_URL + "brand/", requestOptions, { signal: signal })
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
  }, [token]);
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
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title="Accounts"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
      />
      <BrandDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  );
}
