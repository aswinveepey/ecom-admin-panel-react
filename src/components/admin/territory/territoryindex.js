import React from "react";
// import CustomerDetailComp from "./customerdetail";
import DataTableComp from "../../common/datatable";
import TerritoryDetailComp from "./territorydetail";
import TerritoryService from "../../../services/territory";

const territoryService = new TerritoryService();

export default function TerritoryIndexComp(props) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [territorySearch, setTerritorySearch] = React.useState("");

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
        headerName: "Status",
        valueGetter: (params) => params.data?.status?"Active":"Inactive",
      },
      // {
      //   headerName: "PincodeCount",
      //   valueGetter: (params) => params.data?.pincodes.length,
      // },
      {
        headerName: "Last Updated At",
        valueGetter: (params) => params.data?.updatedat,
      },
    ],
  };
  //handle double click
  function handleRowDoubleClick(row) {
    setDialogData(row.data);
    row.data?.name?.toLowerCase() !== "default" && setOpenDialog(true);
  }
  function handleNewClick() {
    setDialogData([]);
    setOpenDialog(true);
  }
  function handleDialogClose() {
    setOpenDialog(false);
  }
  //handle search input
  function onchangeSearchInput(event) {
    setTerritorySearch(event.target.value);
  }
  //datafetch
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (territorySearch) {
      territoryService
        .searchTerritories(signal, territorySearch)
        .then((response) => setRowData(response));
    } else {
      territoryService
        .getTerritories(signal)
        .then((response) => setRowData(response));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [territorySearch]);
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title="Territories"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
        onchangeSearchInput={onchangeSearchInput}
      />
      <TerritoryDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  );
}