import React from "react";
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
const gridData = {
  gridOptions: {
    rowSelection: "multiple",
    pagination: true,
    defaultColDef: {
      resizable: true,
      filter: true,
      sortable: true,
    },
  },
  columnDefs: [
    { headerName: "Name" , valueGetter:(params)=>(params.data?.firstname+" "+params.data?.lastname)},
    { headerName: "Gender" , valueGetter:(params)=>(params.data?.gender)},
  ],
};
export default function CustomerIndexComp(props){
  const [rowData, setRowData] = React.useState([]);
  const token = Cookies.get("token");

  React.useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    fetch(BASE_URL + "customer/", requestOptions, { signal: signal })
      .then(async (data) => {
        const response = await data.json();
        const { status } = data;
        status === 200 && setRowData(response.data);
      })
      .catch((err) => console.log(err));
    return function cleanup(){
      abortController.abort();
    }
  },[token])
  return (
    <div className="ag-theme-material">
      <AgGridReact
        gridOptions={gridData.gridOptions}
        columnDefs={gridData.columnDefs}
        rowData={rowData}
      ></AgGridReact>
    </div>
  ); 
}
