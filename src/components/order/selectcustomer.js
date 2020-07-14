import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CustomerApi from "../../api/customer";

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

export default function SelectCustomer(props){
  const classes = useStyles();
  const [customerSearch, setCustomerSearch] = React.useState("")
  const [customers, setCustomers] = React.useState([])
  const customerapi = new CustomerApi();

  //handle close propogation
  const handleClose = () => {
    props.handleClose();
  };
  //on select customer pass data back to parent
  const selectCustomer = (customer) => {
    const selectedCustomer = customer
    props.selectCustomer(selectedCustomer);
    handleClose();
  };
  const onCustomerSearch = (event)=>{
    event.preventDefault();
    setCustomerSearch(event.target.value)
  }
  //search hook
  //datafetch
  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    customerapi
      .searchCustomers(signal, customerSearch)
      .then((data) => setCustomers(data))
      .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [customerSearch]);
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="customer-select-dialog"
      >
        <DialogContent>
          <Paper component="form" className={classes.searchbar}>
            <InputBase
              placeholder={"Search Customers"}
              className={classes.searchinput}
              onChange={onCustomerSearch}
            />
          </Paper>
          {customers.map((customer) => (
            <Card variant="outlined" key={customer._id}>
              <Button
                onClick={(event)=>{selectCustomer(customer, event);}}
                className={classes.selectButton}
              >
                <CardContent>
                  <Typography variant="body2">
                    {customer.firstname}&nbsp;{customer.lastname}
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