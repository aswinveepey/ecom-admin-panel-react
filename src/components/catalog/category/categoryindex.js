import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";
import DataTableComp from "../../common/datatable";
import CategoryDetailComp from "./categorydetail";

export default function CategoryIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [categorySearch, setCategorySearch] = React.useState("");

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
          '<img width="50" height="50" alt="Category thumbnail" src="' +
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
  //new category creation dialog
  function handleNewClick() {
    setDialogData([]);
    setOpenDialog(true);
  }
  //handle dialog close
  function handleDialogClose() {
    setOpenDialog(false);
  }
  //handle search input
  function onchangeSearchInput(event){
    setCategorySearch(event.target.value)
  }
  //fetch inital data
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
    fetch(BASE_URL + "category/", requestOptions, { signal: signal })
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
  //category search
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //set request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ searchString: categorySearch }),
    };
    //fetch data and set data
    if (categorySearch.length > 2) {
      fetch(BASE_URL + "category/search", requestOptions, { signal: signal })
        .then(async (data) => {
          const response = await data.json();
          const { status } = data;
          // setLoading(false);
          status === 200 && setRowData(response.data);
        })
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [token, categorySearch]);
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title="Category"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
        onchangeSearchInput={onchangeSearchInput}
      />
      <CategoryDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  ); 
}