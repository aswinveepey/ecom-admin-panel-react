import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";
//core imports - Material UI
import LinearProgress from '@material-ui/core/LinearProgress'
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
//icon imports - Material UI
import AddIcon from "@material-ui/icons/Add";
//aggrid
import { makeStyles } from "@material-ui/core/styles";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const useStyles = makeStyles((theme) => ({
  fab: {
    float: "left",
    position: "relative",
    left: "-1rem",
  },
}));

export default function CategoryIndexComp(params) {
  const classes = useStyles();
  const [rowData, setRowData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = Cookies.get("token");
  const gridData = {
    gridOptions: {
      rowSelection: "multiple",
      // rowHeight: 50,
      // onRowDoubleClicked: handleRowDoubleClick,
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
    fetch(BASE_URL + "category/", requestOptions, { signal: signal })
      .then(async (data) => {
        const response = await data.json();
        const { status } = data;
        setLoading(false);
        status === 200 && setRowData(response.data);
      })
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [token]);
  //return component
  return (
    <div className="ag-theme-material">
      <Tooltip title="Add Category">
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          // onClick={handleNewCustomerClick}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {loading === true && (
        <div>
          <LinearProgress color="secondary" />
        </div>
      )}
      <AgGridReact
        gridOptions={gridData.gridOptions}
        columnDefs={gridData.columnDefs}
        rowData={rowData}
      ></AgGridReact>
    </div>
  ); 
}