import React from "react";
import AppBarComp from "../common/appbar";
import DataTableComp from "../common/datatable";
import Cookies from "js-cookie";

import { BASE_URL } from "../../constants";
import EditCellRenderer from "../common/editcellrenderer";
import {LinearProgress} from '@material-ui/core'


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
        {this.state.fetchstatus==='loading' &&(
          <LinearProgress color='secondary'/>
        )}
        {this.state.fetchstatus === "fetched" && (
          <DataTableComp data={gridData} title="Manage Users" />
        )}
      </div>
    );
  }
}
export default UserIndexComp;
