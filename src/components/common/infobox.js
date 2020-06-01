import React from 'react'
import {Col, Card} from 'react-bootstrap'

class InfoBox extends React.Component{
  render(){
    return (
      <div>
        <Col lg={true} sm={true} md={true} xs={true}>
          <Card className="info-box" style={{ width: "18rem" }}>
            <Card.Body>
              <span className="info-box-text">{this.props.title}</span>
              <span className="info-box-number">{this.props.value}</span>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

export default InfoBox;