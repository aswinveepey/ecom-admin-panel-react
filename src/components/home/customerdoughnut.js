import React from "react";
import { Doughnut } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  infoBox: {
    // height: "30vh !important",
    padding: 10,
  },
}));

export default function CustomerDoughnut(props) {
  const classes = useStyles(); //use styles
  const [customerData, setCustomerData] = React.useState([]);

  const doughnut = {
    title: "Customers",
    data: {
      labels: customerData?.map((item) => (item?._id ? "Active" : "Inactive")),
      datasets: [
        {
          label: "Customer",
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          data: customerData?.map((item) => item?.count),
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Customers",
        fontSize: 20,
      },
      legend: { display: true, position: "right" },
      // maintainAspectRatio: false,
    },
  };

  React.useEffect(() => {
    props.data && setCustomerData(props.data);
  }, [props.data]);

  return (
    <Paper className={classes.infoBox}>
      <Doughnut data={doughnut.data} options={doughnut.options} />
    </Paper>
  );
}
