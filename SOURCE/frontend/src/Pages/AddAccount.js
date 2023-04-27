import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment, useRef} from "react";
import { NavComponent } from "../components";
import { Col, Row } from "react-bootstrap";
import {API_URL} from "../utils/constanst";
import React from 'react';
import axios from 'axios';

const AddAccount = () => {

  const [formValue, setformValue] = React.useState({
    email: '',
    password: '',
    role: ''
  });

  const handleSubmit = async() => {
    // store the states in the form data
    const loginFormData = new FormData();
    loginFormData.append("username", formValue.email)
    loginFormData.append("password", formValue.password)
    loginFormData.append("role", formValue.role)

    try {
      // axios post request
      const res = await axios({
        method: "post",
        url: API_URL + "",
        data: loginFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }, {
        auth: {
          username: localStorage.getItem('email'),
          password: localStorage.getItem('password')
        }});
      console.log(res)
    } catch(error) {
      console.error(error);
    }
  }

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }


    return (
        <Fragment>
          <NavComponent/>
          <div className="container" style={{paddingTop: 20, paddingBottom: 100}}>
            <h4>Create new account</h4>
            <hr/>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="formUsername">
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Username" value={formValue.email} onChange={handleChange} required/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPassword">
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Password" value={formValue.email} onChange={handleChange} required/>
                </Col>
              </Form.Group>
              <fieldset id="role" onChange={handleChange}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label as="legend" column sm={2}>
                    Role
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                        type="radio"
                        value="isNotAuthenticated"
                        label="basic"
                        name="formHorizontalRadios"
                        id="formRoleBasic"
                    />
                    <Form.Check
                        type="radio"
                        value="isAuthenticatedUser"
                        label="advanced"
                        name="formHorizontalRadios"
                        id="formRoleAdvanced"
                    />
                    <Form.Check
                        type="radio"
                        value="isAuthenticatedSecurityUser"
                        label="admin"
                        name="formHorizontalRadios"
                        id="formRoleAdmin"
                    />
                  </Col>
                </Form.Group>
              </fieldset>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{span: 10, offset: 2}}>
                  <Button type="submit" href="/admin" onClick={handleSubmit}>
                    Submit new account
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Fragment>
    );
};

export default AddAccount;
