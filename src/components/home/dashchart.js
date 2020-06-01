import React from 'react'
import { Pie } from "react-chartjs-2";
import {Card} from 'react-bootstrap';

class DashChartComp extends React.Component{
  render(){
    const data = {
      datasets: [
        {
          data: [10, 20, 30],
          label: "Category Wise GMV",
          backgroundColor: ["#93948d", "#eaf2b6", "rgb(255, 99, 134)"],
          options: { legend: { display: false } },
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Category1", "Category2", "Category3"],
    };
    return (
      <Card>
        <Card.Header>Category Wise GMV</Card.Header>
        <Card.Body>
          <Pie data={data} />
        </Card.Body>
      </Card>
    );
  }
}

export default DashChartComp;