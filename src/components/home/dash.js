import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import InfoBox from '../common/infobox'
import DashChartComp from './dashchart'

class DashComp extends React.Component {
  render() {
    const infoBoxData = [
      { id: 1, title: "No of Customers", value: "2340" },
      { id: 2, title: "Monthly GMV", value: "10 Cr" },
      { id: 3, title: "Quarterly GMV", value: "20 Cr" },
    ];
    const infoBoxComponent = infoBoxData.map((data) => (
      <InfoBox title={data.title} value={data.value} key={data.id}/>
    ));
    return (
      <div>
        <Container className="box">
          <Row>
            <h3 className="section-title">Dashboard</h3>
          </Row>
          <Row>{infoBoxComponent}</Row>
          <hr />
          <Row>
            <Col md='12'>
              <DashChartComp />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default DashComp;