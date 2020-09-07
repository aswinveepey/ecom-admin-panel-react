import React, { Suspense } from "react";
//api import
import LeadServices from "../../../services/lead";

const DataTableComp = React.lazy(() => import("../../common/datatable"));
const LeadDetailComp = React.lazy(() => import("./leaddetail"));

export default function LeadIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [leadSearch, setLeadSearch] = React.useState("");

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
        headerName: "ID",
        valueGetter: (params) => params.data?.shortid,
      },
      {
        headerName: "Name",
        valueGetter: (params) => params.data?.firstname + params.data?.lastname,
      },
      {
        headerName: "Type",
        valueGetter: (params) => params.data?.type,
      },
      {
        headerName: "Account",
        valueGetter: (params) => params.data?.account?.name,
      },
      {
        headerName: "Mobile",
        valueGetter: (params) => params.data?.mobile,
      },
      {
        headerName: "Score",
        valueGetter: (params) => params.data?.score,
      },
      {
        headerName: "Source",
        valueGetter: (params) => params.data?.source,
      },
      {
        headerName: "GST",
        valueGetter: (params) => params.data?.gst,
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
    setLeadSearch(event.target.value);
  }
  //datafetch
  React.useEffect(() => {
    const leadService = new LeadServices();
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (leadSearch) {
      leadService
        .searchLeads(signal, leadSearch)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    } else {
      leadService
        .getLeads(signal)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [leadSearch]);
  //return component
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTableComp
          title="Lead"
          handleRowDoubleClick={handleRowDoubleClick}
          handleNewClick={handleNewClick}
          gridData={gridData}
          rowData={rowData}
          onchangeSearchInput={onchangeSearchInput}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LeadDetailComp
          handleDialogClose={handleDialogClose}
          open={openDialog}
          data={dialogData}
        />
      </Suspense>
    </React.Fragment>
  );
}
