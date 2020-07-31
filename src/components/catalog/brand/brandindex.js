import React, {Suspense} from "react";
//api import
import BrandService from "../../../services/brand"

const DataTableComp = React.lazy(() => import("../../common/datatable"));
const BrandDetailComp = React.lazy(() => import("./branddetail"));

const brandService = new BrandService();

export default function BrandIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [brandSearch, setBrandSearch] = React.useState("");

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
    //handle double click
  function handleRowDoubleClick(row) {
    setDialogData(row.data);
    setOpenDialog(true);
  }
  //new account
  const handleNewClick = ()=>{
    setOpenDialog(true);
  }
  const handleDialogClose = () => {
    setOpenDialog(false);
  }
  //handle search input
  const onchangeSearchInput = (event)=>{
    const value = event.target.value
    setBrandSearch(value)
  }
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if(brandSearch){
      brandService
        .searchBrands(signal, brandSearch)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    } else {
      brandService
        .getBrands(signal)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [brandSearch]);
  //return component
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTableComp
          title="Brand"
          handleRowDoubleClick={handleRowDoubleClick}
          handleNewClick={handleNewClick}
          gridData={gridData}
          rowData={rowData}
          onchangeSearchInput={onchangeSearchInput}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <BrandDetailComp
          handleDialogClose={handleDialogClose}
          open={openDialog}
          data={dialogData}
        />
      </Suspense>
    </React.Fragment>
  );
}
