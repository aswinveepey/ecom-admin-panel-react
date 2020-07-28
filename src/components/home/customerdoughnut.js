import React from "react";
import { Doughnut } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";

export default function CustomerDoughnut(props) {
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
  }, [props]);

  return (
    <Paper className="chart-box">
      <Doughnut data={doughnut.data} options={doughnut.options} />
    </Paper>
  );
}
