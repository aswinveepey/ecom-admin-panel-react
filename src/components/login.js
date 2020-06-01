import React from "react";
import history from '../history'
import {Form, Button, Card, Container} from 'react-bootstrap'

class Login extends React.Component {

  handleSubmit(event) {
    history.push("/home");
  }
  render() {
    return (
      <Container fluid className="login-form">
        <div className="row justify-content-center">
          <Card border="dark">
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="btn-block"
                >
                  Submit
                </Button>
                <hr></hr>
                <a href="/">Forgot Password?</a>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }
}

export default Login;