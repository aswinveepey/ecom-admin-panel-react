import React, {Suspense} from "react";
//api import
import CategoryApi from "../../../api/category"

const DataTableComp = React.lazy(() => import("../../common/datatable"));
const CategoryDetailComp = React.lazy(() => import("./categorydetail"));

export default function CategoryIndexComp(params) {
  const [rowData, setRowData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogData, setDialogData] = React.useState([]);
  const [categorySearch, setCategorySearch] = React.useState("");

  const categoryApi = new CategoryApi();

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
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    if(categorySearch){
      categoryApi
        .searchCategories(signal, categorySearch)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    } else {
      categoryApi
        .getCategories(signal)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [categorySearch]);
  //return component
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading...</div>}>
        <DataTableComp
          title="Category"
          handleRowDoubleClick={handleRowDoubleClick}
          handleNewClick={handleNewClick}
          gridData={gridData}
          rowData={rowData}
          onchangeSearchInput={onchangeSearchInput}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryDetailComp
          handleDialogClose={handleDialogClose}
          open={openDialog}
          data={dialogData}
        />
      </Suspense>
    </React.Fragment>
  ); 
}