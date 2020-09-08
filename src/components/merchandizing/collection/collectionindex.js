import React, { Suspense } from "react";
import moment from "moment";
//api import
import CollectionServices from "../../../services/collection";

const DataTableComp = React.lazy(() => import("../../common/datatable"));
const CollectionDetailComp = React.lazy(() => import("./collectiondetail"));

export default function CollectionIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [collectionSearch, setCollectionSearch] = React.useState("");

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
        headerName: "Status",
        valueGetter: (params) => params.data?.status?"Active":"Inactive",
      },
      {
        headerName: "Start Date",
        valueGetter: (params) => moment(params.data?.startdate).format("LLLL"),
      },
      {
        headerName: "End Date",
        valueGetter: (params) => moment(params.data?.enddate).format("LLLL"),
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
  function onchangeSearchInput(event) {
    setCollectionSearch(event.target.value);
  }
  //datafetch
  React.useEffect(() => {
    const collectionService = new CollectionServices();
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (collectionSearch) {
      collectionService
        .searchCollections(signal, collectionSearch)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    } else {
      collectionService
        .getCollections(signal)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [collectionSearch]);
  //return component
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTableComp
          title="Collection"
          handleRowDoubleClick={handleRowDoubleClick}
          handleNewClick={handleNewClick}
          gridData={gridData}
          rowData={rowData}
          onchangeSearchInput={onchangeSearchInput}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionDetailComp
          handleDialogClose={handleDialogClose}
          open={openDialog}
          data={dialogData}
        />
      </Suspense>
    </React.Fragment>
  );
}
