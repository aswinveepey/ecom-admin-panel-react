import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CustomerService from "../../services/customer"

const useStyles = makeStyles((theme) => ({
  selectButton: {
    textTransform: "none",
  },
}));

const customerService = new CustomerService();

export default function AddressSelectComp(props){
  const classes = useStyles();
  const [addresses, setAddresses] = React.useState([])

  const handleClose = ()=>{
    props.handleClose()
  }
  const changeAddress = (address)=>{
    props.changeAddress(address);
    props.handleClose()
  }
  //datafetch
  React.useEffect(() => {
    //clean up subscriptions using abortcontroller & signals
    const abortController = new AbortController();
    const signal = abortController.signal;
    //fetch data and set data
    props.data?._id &&
      customerService
        .getOneCustomer(signal, props.data._id)
        .then((data) => setAddresses(data.address))
        .catch((err) => console.log(err));
    return function cleanup() {
      abortController.abort();
    };
  }, [props.data]);
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="address-select"
      >
        <DialogTitle>Select Address</DialogTitle>
        <DialogContent>
          {addresses.map((address) => (
            <Card variant="outlined" key={address.name}>
              <Button
                onClick={changeAddress.bind(this, address)}
                className={classes.selectButton}
              >
                <CardContent>
                  <Typography variant="body2">
                    {address.address1}&nbsp;
                    {address.address2},&nbsp;
                    {address.landmark},&nbsp;
                    {address.area},{address.district},{address.pincode},
                    {address.state},{address.country}
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