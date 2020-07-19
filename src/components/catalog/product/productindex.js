import React from 'react'
import SkuIndexComp from "./skuindex"
import ProductDetailComp from "./productdetail"
//<aterial UI
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
// import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
//icon imports - Material UI
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SearchIcon from "@material-ui/icons/Search";
//Styles
import { makeStyles } from "@material-ui/core/styles";
import ProductApi from "../../../api/product"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "1%",
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
  searchbar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // marginLeft: "1%",
    marginBottom: "1%",
  },
  searchinput: {
    width: "100%",
  },
  container: {
    height: "inherit",
    marginLeft: "1%",
  },
}));
function ExpandableRow(props){
  const classes = useStyles();
  const { row } = props;
  const [productExpand, setProductExpand] = React.useState(false);

  //open Product Detail
  const openProductDetail = (event)=>{
    event.preventDefault()
    props.openProductDetail(row);
  }
  return (
    <React.Fragment>
      <TableRow key={row.shortid} className={classes.tablerow}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setProductExpand(!productExpand)}
          >
            {productExpand ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            size="small"
            aria-label="product detail"
            onClick={openProductDetail}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <img
            src={row.assets?.thumbnail}
            width="50"
            height="50"
            alt="product thumbnail"
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.shortid}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.category.name}</TableCell>
        <TableCell>{row.brand.name}</TableCell>
        <TableCell>{row.skus.length}</TableCell>
        <TableCell>{row.updatedat}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={productExpand} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle2" gutterBottom component="div">
                SKUs
              </Typography>
              {row.skus && <SkuIndexComp data={row.skus} product_id={row._id}/>}
              {/* SKU Component */}
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
  const [productDetailOpen, setProductDetailOpen] = React.useState(false);
  const [productDetailData, setProductDetailData] = React.useState([])
  const [productSearch, setProductSearch] = React.useState("");

  //open Product Detail
  const openProductDetail = (data) => {
    setProductDetailData(data);
    setProductDetailOpen(true);
  };
  //close Product Detail
  const closeProductDetail = () => {
    setProductDetailOpen(false);
  };
  //handle Product Search
  const handleProductSearch = (event) => {
    setProductSearch(event.target.value);
  };

  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const productApi = new ProductApi();
    const abortController = new AbortController();
    const signal = abortController.signal;
    if(productSearch){
      productApi
        .searchProducts(signal, productSearch)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    } else {
      productApi
        .getProducts(signal)
        .then((data) => setRowData(data))
        .catch((err) => console.log(err));
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [productSearch]);

  return (
    <React.Fragment>
      <Button
        color="primary"
        variant="outlined"
        aria-label="add"
        className={classes.button}
        onClick={openProductDetail}
      >
        Add Product
      </Button>
      <div className={classes.container}>
        <Paper component="form" className={classes.searchbar}>
          <InputBase
            placeholder="Search Products"
            className={classes.searchinput}
            onChange={handleProductSearch}
          />
          <IconButton type="submit" aria-label="search products">
            <SearchIcon />
          </IconButton>
        </Paper>
        <TableContainer>
          {rowData && (
            <Table aria-label="product table" className={classes.table}>
              <TableHead>
                <TableRow className={classes.tablerow}>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className={classes.tableheader}>Id</TableCell>
                  <TableCell className={classes.tableheader}>Name</TableCell>
                  <TableCell className={classes.tableheader}>
                    Category
                  </TableCell>
                  <TableCell className={classes.tableheader}>Brand</TableCell>
                  <TableCell className={classes.tableheader}>
                    SKU Count
                  </TableCell>
                  <TableCell className={classes.tableheader}>
                    Last updated at
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map((row) => (
                  <ExpandableRow
                    key={row._id}
                    row={row}
                    openProductDetail={openProductDetail}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
      {productDetailOpen && (
        <ProductDetailComp
          open={productDetailOpen}
          handleClose={closeProductDetail}
          data={productDetailData}
        />
      )}
    </React.Fragment>
  );
}