import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

class DataTableComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridOptions: props.data.gridOptions,
      columnDefs: props.data.columnDefs,
      rowData: props.data.rowData,
      title: props.title
    };
  }
  render() {
    return (
      <div>
        <Paper
          style={{
            padding: "15px",
          }}
        >
          <Grid container direction="column">
            <Grid item>
              <div
                className="ag-theme-material"
                style={{ height: "90vh", width: "100%", padding: "15px" }}
              >
                <Typography variant="h6">{this.state.title}</Typography>
                <AgGridReact
                  gridOptions={this.state.gridOptions}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                ></AgGridReact>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default DataTableComp;