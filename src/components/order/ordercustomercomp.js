import React, {Suspense} from "react"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

const AddressSelectComp = React.lazy(() => import("./addressselect"));


export default function CustomerDisplayComp(props) {
  const [openAddressSelector, setOpenAddressSelector] = React.useState(false);
  const [changeAddresstype, setChangeAddresstype] = React.useState("");

  const addressSelectorClick = (name) => {
    setChangeAddresstype(name);
    setOpenAddressSelector(true);
  };
  const handleCloseAddressSelector = () => {
    setOpenAddressSelector(false);
  };
  const handleChangeAddress = (address) => {
    props.changeAddress(address, changeAddresstype);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Customer Details
              </Typography>
              <Typography variant="h5" component="h2">
                {props.data?.customer?.firstname +
                  " " +
                  props.data.customer?.lastname}
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>{props.data?.customer?._id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact No</TableCell>
                    <TableCell>{props.data?.customer?.contactnumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Account</TableCell>
                    <TableCell>{props.data?.customer?.account?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Primary No</TableCell>
                    <TableCell>
                      {props.data?.customer?.auth?.mobilenumber}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Delivery Address
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.deliveryaddress?.address1}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.deliveryaddress?.address2}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.deliveryaddress?.area}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.deliveryaddress?.landmark}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.deliveryaddress?.district},
                {props.data?.deliveryaddress?.pincode}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.deliveryaddress?.state},
                {props.data?.deliveryaddress?.country}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={addressSelectorClick.bind(this, "deliveryaddress")}
              >
                Change
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Billing Address
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.billingaddress?.address1}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.billingaddress?.address2}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.billingaddress?.area}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.billingaddress?.landmark}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.billingaddress?.district},
                {props.data?.billingaddress?.pincode}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data?.billingaddress?.state},
                {props.data?.billingaddress?.country}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={addressSelectorClick.bind(this, "billingaddress")}
              >
                Change
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Suspense fallback={<div>Loading...</div>}>
        <AddressSelectComp
          data={props.data?.customer}
          open={openAddressSelector}
          handleClose={handleCloseAddressSelector}
          changeAddress={handleChangeAddress}
        />
      </Suspense>
    </React.Fragment>
  );
}
