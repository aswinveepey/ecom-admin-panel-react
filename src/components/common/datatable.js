import React from "react";
//core imports - Material UI
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
//icon imports - Material UI
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
//style imports - material ui
import { makeStyles } from "@material-ui/core/styles";
//aggrid imports
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


const useStyles = makeStyles((theme) => ({
  fab: {
    float: "left",
    position: "relative",
    left: "-1rem",
  },
  searchbar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    margin: "1%",
  },
  searchinput: {
    width: "100%",
  },
}));

export default function DataTableComp(props){
  const classes = useStyles();
  return (
    <div className="ag-theme-material">
      <Tooltip title={"Add " + props.title}>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={props.handleNewClick}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Paper component="form" className={classes.searchbar}>
        <InputBase
          placeholder={"Search " + props.title}
          className={classes.searchinput}
        />
        <IconButton type="submit" aria-label={"Search " + props.title}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <AgGridReact
        gridOptions={props.gridData?.gridOptions}
        columnDefs={props.gridData?.columnDefs}
        rowData={props.rowData}
      ></AgGridReact>
    </div>
  );

}