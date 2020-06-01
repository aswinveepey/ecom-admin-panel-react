import React from "react";
import { Container, Row } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class OrderIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { field: "id", headerName: "Order ID" },
        { field: "title", headerName: "Product Name" },
        { field: "customer", headerName: "Customer" },
        { field: "mob_number", headerName: "Mobile Number" },
        { field: "quantity", headerName: "Quantity" },
        { field: "amount", headerName: "Amount" },
        { field: "discount", headerName: "Discount" },
        { field: "total_amount", headerName: "Total Amount" },
        { field: "status", headerName: "Status" },
        { field: "created_time", headerName: "Order Time" },
        { field: "executive", headerName: "Delivery Executive" },
      ],
      rowData: [
        { id: 0, title: "Aspic - Light" },
        { id: 1, title: "Wine - Tribal Sauvignon" },
        { id: 2, title: "Mayonnaise - Individual Pkg" },
        { id: 3, title: "Cookies - Englishbay Oatmeal" },
        { id: 4, title: "Coffee Decaf Colombian" },
        { id: 5, title: "Truffle Paste" },
        { id: 6, title: "Beef - Top Sirloin - Aaa" },
        { id: 7, title: "Pork - Chop, Frenched" },
        { id: 8, title: "Flour - Buckwheat, Dark" },
        { id: 9, title: "Flour - Buckwheat, Dark" },
        { id: 10, title: "Flour - Buckwheat, Dark" },
        { id: 11, title: "Flour - Buckwheat, Dark" },
      ],
    };
  }
  render() {
    return (
      <div>
        <Container className="box">
          <Row>
            <h3 className="section-title">Manage Orders</h3>
          </Row>
          <Row>
            <div
              className="ag-theme-alpine"
              style={{ height: "500px", width: "100%" }}
            >
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
              ></AgGridReact>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default OrderIndex