import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment } from "react";
import { NavComponent } from "../components";
import { Col, Row } from "react-bootstrap";
function AddAccount() {
  return (
    <Fragment>
      <NavComponent />
      <div className="container" style={{ paddingTop:20, paddingBottom:100 }}>
        <h4>Create new account</h4>
        <hr />
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formUsername">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control placeholder="Username" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control placeholder="Password" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Role
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Basic"
                  name="formHorizontalRadios"
                  id="formRoleBasic"
                />
                <Form.Check
                  type="radio"
                  label="Advanced"
                  name="formHorizontalRadios"
                  id="formRoleAdvanced"
                />
                <Form.Check
                  type="radio"
                  label="Admin"
                  name="formHorizontalRadios"
                  id="formRoleAdmin"
                />
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" href="/admin">
                Sign in
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </Fragment>
  );
}

export default AddAccount;
