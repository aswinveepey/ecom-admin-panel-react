import React from 'react'
//cookie library import
import Cookies from "js-cookie";
import { BASE_URL } from "../../../constants";
//<aterial UI
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

//icon imports - Material UI
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AddIcon from "@material-ui/icons/Add";
//Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    float: "left",
    position: "relative",
    left: "-1rem",
  },
  table: {
    minWidth: 700,
  },
  tablegrid: {
    overflow: "auto",
  },
  tablerow: {
    height: "50",
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableheader: {
    fontWeight: "600",
    fontSize: "12px",
    color: "rgba(0, 0, 0, 0.54)",
  },
}));
function ExpandableRow(props){
  const classes = useStyles();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow key={row.shortid} className={classes.tablerow}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img src={row.assets?.thumbnail} width="50" height="50" />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.shortId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.category.name}</TableCell>
        <TableCell>{row.brand.name}</TableCell>
        <TableCell>{row.updatedat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                SKUs
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function ProductIndexComp(props){
  const classes = useStyles();
  const [rowData, setRowData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const token = Cookies.get("token");

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
    fetch(BASE_URL + "product/", requestOptions, { signal: signal })
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

  return (
    <React.Fragment>
      <Grid container>
        <Grid item>
          <Tooltip title="Add Product">
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
        </Grid>
        <Grid item className={classes.tablegrid}>
          {loading === true && (
            <div>
              <LinearProgress color="secondary" />
            </div>
          )}
          <TableContainer>
            {rowData && (
              <Table aria-label="simple table" className={classes.table}>
                <TableHead>
                  <TableRow className={classes.tablerow}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className={classes.tableheader}>Id</TableCell>
                    <TableCell className={classes.tableheader}>Name</TableCell>
                    <TableCell className={classes.tableheader}>
                      Category
                    </TableCell>
                    <TableCell className={classes.tableheader}>Brand</TableCell>
                    <TableCell className={classes.tableheader}>
                      Last updated at
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((row) => (
                    <ExpandableRow key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}