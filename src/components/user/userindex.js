import React from "react";
import AppBarComp from "../common/appbar";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import Cookies from "js-cookie";

import { BASE_URL } from "../../constants";
import EditCellRenderer from "../common/editcellrenderer";
import { LinearProgress, Grid, Paper, Typography } from "@material-ui/core";


class UserIndexComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchstatus: 'loading',
      data: "",
    };
  }
  componentDidMount() {
    this.fetchUserData();
  }
  fetchUserData = async () => {
    let token;
    try {
      token = Cookies.get("token");
    } catch (error) {
      console.log(error);
      return null;
    }
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    };
    const fetchResponse = await fetch(BASE_URL + "user/", requestOptions);
    const { status } = fetchResponse;
    const jsonResponse = await fetchResponse.json();
    if (status === 200) {
      // console.log(jsonResponse.data);
      this.setState({ fetchstatus: "fetched", data: jsonResponse.data });
    } else {
      this.setState({ fetchstatus: "unAuthenticated" });
    }
  };
  render() {
    var gridData = {
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
        { field: "firstname", headerName: "First Name" },
        { field: "lastname", headerName: "Last Name" },
        { field: "role.name", headerName: "Role" },
        { field: "contactnumber", headerName: "Contact Number" },
        { field: "designation", headerName: "Designation" },
        { field: "contactaddress", headerName: "Contact Address" },
        {
          headerName: "",
          field: "_id",
          cellRendererFramework: EditCellRenderer,
        },
      ],
      rowData: this.state.data,
      frameworkComponents: {
        editcellrenderer: EditCellRenderer,
      },
    };
    return (
      <div>
        <AppBarComp title="Users" />
        {this.state.fetchstatus === "loading" && (
          <LinearProgress color="secondary" />
        )}
        {this.state.fetchstatus === "fetched" && (
          <Paper
            className="paper-container"
          >
            <Grid container direction="column">
              <Grid item>
                <div
                  className="ag-theme-material"
                >
                  <Typography variant="h6">Manager Users</Typography>
                  <AgGridReact
                    gridOptions={gridData.gridOptions}
                    columnDefs={gridData.columnDefs}
                    rowData={gridData.rowData}
                  ></AgGridReact>
                </div>
              </Grid>
            </Grid>
          </Paper>
        )}
      </div>
    );
  }
}
export default UserIndexComp;
