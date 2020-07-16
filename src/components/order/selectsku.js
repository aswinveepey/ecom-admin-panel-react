import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import SkuApi from "../../api/sku"

const useStyles = makeStyles((theme) => ({
  selectButton: {
    textTransform: "none",
    width: "100%",
  },
  searchinput: {
    width: "100%",
  },
  searchbar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // marginLeft:'1%',
    marginBottom: "1%",
  },
}));
const skuApi = new SkuApi();

export default function SelectSKU(props) {
  const classes = useStyles();
  const [skuSearch, setSkuSearch] = React.useState("");
  const [skus, setSkus] = React.useState([]);

  //handle close propogation
  const handleClose = () => {
    props.handleClose();
  };
  //on select sku pass data back to parent
  const selectSku = (sku) => {
    props.selectSku(sku);
    props.handleClose();
  };
  const onSkuSearch = (event) => {
    event.persist();
    setSkuSearch(event.target.value);
  };
  //search hook
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    skuApi
      .searchSkus(signal, skuSearch)
      .then((data) => setSkus(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [skuSearch]);
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="sku-select-dialog"
      >
        <DialogContent>
          <Paper component="form" className={classes.searchbar}>
            <InputBase
              placeholder={"Search Skus"}
              className={classes.searchinput}
              onChange={onSkuSearch}
            />
          </Paper>
          {skus.map((sku) => (
            <Card variant="outlined" key={sku._id}>
              <Button
                onClick={selectSku.bind(this, sku)}
                className={classes.selectButton}
              >
                <CardContent>
                  <Typography variant="body2">
                    {sku.product?.name}&nbsp;{sku.name}
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          ))}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
