import React from "react";
import AppBarComp from "../common/appbar";
import DataTableComp from "../common/datatable";

class UserComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexFlag: true,
      createFlag: false,
      editFlag: false,
    };
  }
  render() {
    const data = {
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
        { field: "username", headerName: "User Name", checkboxSelection: true },
        { field: "role", headerName: "Role"},
        { field: "email", headerName: "Email" },
        { field: "mob_number", headerName: "Mobile Number" },
        { field: "status", headerName: "Status" },
        { field: "last_active", headerName: "Last Active" },
      ],
      rowData: [
        {
          username: "Aswin V P",
          role: "Admin",
          status: "Active",
          mob_number: "9867453424",
          email: "admin@littech.in",
          last_active: "20-5-2020 18:45",
        },
      ],
    };
    return (
      <div>
        <AppBarComp title="Users" />
        {this.state.indexFlag && <DataTableComp data={data} title="Manage Users" />}
      </div>
    );
  }
}
export default UserComp;
