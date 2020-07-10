import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";
import DataTableComp from "../../common/datatable";
import DivisionDetailComp from "./divisiondetail";

export default function DivisionIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [divisionSearch, setDivisionSearch] = React.useState("");

  const token = Cookies.get("token");
  const gridData = {
    gridOptions: {
      rowSelection: "multiple",
      // rowHeight: 50,
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
          '<img width="50" height="50" alt="Division thumbnail" src="' +
            params.data.assets.thumbnail +
            '"/>',
      },
      {
        headerName: "Name",
        valueGetter: (params) => params.data?.name,
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
    setDivisionSearch(event.target.value)
  }
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    let requestOptions = {}
    let fetchurl = ""
    if(divisionSearch){
      requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ searchString: divisionSearch }),
      };
      fetchurl = BASE_URL + "division/search"
    } else {
      requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      fetchurl = BASE_URL + "division";
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
  }, [token, divisionSearch]);
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title="Division"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
        onchangeSearchInput={onchangeSearchInput}
      />
      <DivisionDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  );
}
