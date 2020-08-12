import React from "react";
//core imports - Material UI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
//icon imports - Material UI
import SearchIcon from "@material-ui/icons/Search";
//style imports - material ui
import { makeStyles } from "@material-ui/core/styles";
//aggrid imports
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-material.css";


const useStyles = makeStyles((theme) => ({
  button: {
    // float: "left",
    // position: "fixed",
    margin:"1%"
  },
  searchbar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // marginLeft:'1%',
    marginBottom:'1%'
  },
  searchinput: {
    width: "100%",
  },
  container: {
    height: "inherit",
    marginLeft:"1%"
  },
}));

export default function DataTableComp(props){
  const classes = useStyles();
  return (
    <div className="ag-theme-material" style={{ height: "800px" }}>
      {/* <Tooltip title={"Add " + props.title}> */}
      <Button
        // size="small"
        color="primary"
        variant="outlined"
        aria-label="Add"
        color="secondary"
        className={classes.button}
        onClick={props.handleNewClick}
      >
        {"Add " + props.title}
        {/* <AddIcon /> */}
      </Button>
      {/* </Tooltip> */}
      <div className={classes.container}>
        <Paper component="form" className={classes.searchbar}>
          <InputBase
            placeholder={"Search " + props.title}
            className={classes.searchinput}
            onChange={props.onchangeSearchInput}
          />
          <IconButton type="submit" aria-label={"Search " + props.title}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <AgGridReact
          gridOptions={props.gridData?.gridOptions}
          columnDefs={props.gridData?.columnDefs}
          rowData={props.rowData}
          className={classes.aggrid}
        ></AgGridReact>
      </div>
    </div>
  );

}