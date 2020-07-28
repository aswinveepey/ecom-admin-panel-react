import React from "react";
// import CustomerDetailComp from "./customerdetail";
import DataTableComp from "../../common/datatable";
import RoleDetailComp from "./roledetail";
import RoleApi from "../../../api/role";

const roleapi = new RoleApi();

export default function RoleIndexComp(props) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [roleSearch, setRoleSearch] = React.useState("");

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
      // {
      //   headerName: "Status",
      //   valueGetter: (params) => (params.data?.status ? "Active" : "Inactive"),
      // },
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
    setOpenDialog(true);
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
    setRoleSearch(event.target.value);
  }
  //datafetch
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (roleSearch) {
      roleapi
        .searchRole(signal, roleSearch)
        .then((response) => setRowData(response));
    } else {
    roleapi
        .getRoles(signal)
        .then((response) => setRowData(response));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [roleSearch]);
  //return component
  return (
    <React.Fragment>
      <DataTableComp
        title="Roles"
        handleRowDoubleClick={handleRowDoubleClick}
        handleNewClick={handleNewClick}
        gridData={gridData}
        rowData={rowData}
        onchangeSearchInput={onchangeSearchInput}
      />
      <RoleDetailComp
        handleDialogClose={handleDialogClose}
        open={openDialog}
        data={dialogData}
      />
    </React.Fragment>
  );
}
