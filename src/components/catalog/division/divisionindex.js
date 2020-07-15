import React, { Suspense } from "react";
//api import
import DivisionApi from "../../../api/division"

const DataTableComp = React.lazy(() => import("../../common/datatable"));
const DivisionDetailComp = React.lazy(()=>import("./divisiondetail"))

export default function DivisionIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [divisionSearch, setDivisionSearch] = React.useState("");

  const divisionApi = new DivisionApi();
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
    if(divisionSearch){
      divisionApi
        .searchDivisions(signal, divisionSearch)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    } else {
      divisionApi
        .getDivisions(signal)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [divisionSearch]);
  //return component
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTableComp
          title="Division"
          handleRowDoubleClick={handleRowDoubleClick}
          handleNewClick={handleNewClick}
          gridData={gridData}
          rowData={rowData}
          onchangeSearchInput={onchangeSearchInput}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <DivisionDetailComp
          handleDialogClose={handleDialogClose}
          open={openDialog}
          data={dialogData}
        />
      </Suspense>
    </React.Fragment>
  );
}
