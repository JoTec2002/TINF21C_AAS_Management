import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment } from "react";
import { NavComponent } from "../components";
import { Col, Row } from "react-bootstrap";
import {API_URL} from "../utils/constanst";
import React, { useState } from 'react';
import axios from 'axios';

const AddAccount = () => {

  const [validated, setValidated] = useState(false);

  const [formValue, setformValue] = React.useState({
    email: '',
    password: '',
    role: ''
  });


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      postNewAccount();
    }
    setValidated(true);
  };

  const postNewAccount = async() => {

    // store the states in the form data
    const formData = new FormData();

    console.log("Username: " + formValue.email);
    console.log("Password: " + formValue.password);
    console.log("Role: " + formValue.role);

    formData.append("username", formValue.email);
    formData.append("password", formValue.password);
    formData.append("role", formValue.role);

    var object = {};
    formData.forEach((value, key) => object[key] = value);
    var formDataJson = JSON.stringify(object);

    console.log(formDataJson);

    axios.get(API_URL+"submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth", {
      auth: {
        username: localStorage.getItem('email'),
        password: localStorage.getItem('password')
      }})
        .then(res => {
          console.log("Response : ", res);
          const shells = res.data.value;
          this.setState({ shells, loading: false });
        })
        .catch(error=>{
          console.log(error);
        })

    try {
      // axios post request
      const res = await axios({
        method: "post",
        url: API_URL + `submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth.${formDataJson.username}`,
        data: formDataJson,
        headers: { "Content-Type": "application/json" },
      }, {
        auth: {
          username: "luka@example.com", // localStorage.getItem('email'),
          password: "wasAnnares"  // localStorage.getItem('password')
        }});
      console.log(res);
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
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Form.Group as={Row} className="mb-3" controlId="formUsername">
                <Form.Label column sm={2}>
                  Username
                </Form.Label>
                <Col sm={10}>
                  <Form.Control name="email" type="email" placeholder="Username" value={formValue.email} onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email as username.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formPassword">
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control name="password" type="password" placeholder="Password" value={formValue.password} onChange={handleChange} required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a password.
                  </Form.Control.Feedback>
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
                        value="isNotAuthenticated"
                        label="basic"
                        name="role"
                        id="formRoleBasic"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="radio"
                        value="isAuthenticatedUser"
                        label="advanced"
                        name="role"
                        id="formRoleAdvanced"
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="radio"
                        value="isAuthenticatedSecurityUser"
                        label="admin"
                        name="role"
                        id="formRoleAdmin"
                        onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              </fieldset>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{span: 10, offset: 2}}>
                  <Button type="submit" href="/admin#/create" onClick={handleSubmit}>
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
