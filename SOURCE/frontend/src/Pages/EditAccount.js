import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Fragment } from "react";
import { NavComponent } from "../components";
import { Col, Row } from "react-bootstrap";
import {API_URL} from "../utils/constanst";
import React, { useState } from 'react';
import axios from 'axios';
import {getCookie} from "../components/helpers";

const EditAccount = () => { // ({formData})

    const [validated, setValidated] = useState(false);

    const [formValue, setformValue] = React.useState({
        email: '', //formData.value[0].value[0].idShort,
        password: '',
        role: ''
    });

    function routToAssociatedRoleMapping(authRes) {
        switch (authRes) {
            case "isNotAuthenticated":
                return "1";
            case "isAuthenticatedUser":
                return "2";
            case "isAuthenticatedSecurityUser":
                return "3";
            default:
                console.error("Undefined Authentication : ", authRes);
                return "500";
        }
    }


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (!(formValue.email === "" || formValue.email === null || formValue.password === "" || formValue.password === null || formValue.role === "" || formValue.role === null )){
            editAccount();
        } else {
            alert("Please make sure the form completly.");
        }
    };

    const editAccount = async () => {
        console.log("Username: " + formValue.email);
        console.log("Password: " + formValue.password);
        console.log("Role: " + formValue.role);

        const formDataBasicAuth = `{"idShort":"${formValue.email}","kind":"Instance","semanticId":{"type":"GlobalReference","keys":[]},"dataSpecifications":[],"valueType":"xs:string","value":"${formValue.password}","modelType":"Property"}`;
        const formDataRoleMapping = `{"idShort": "${formValue.email}", "kind": "Instance","semanticId": {"type": "GlobalReference","keys": []},"dataSpecifications": [],"valueType": "xs:string","value": "","modelType": "Property"}`;

        console.log(formDataBasicAuth);
        console.log(formDataRoleMapping);

        // store the states in the formDataJson
        const formDataJsonBasicAuth = JSON.parse(formDataBasicAuth);
        const formDataJsonRoleMapping = JSON.parse(formDataRoleMapping);

        console.log(formDataJsonBasicAuth);
        console.log(formDataJsonRoleMapping);
        console.log(routToAssociatedRoleMapping(formValue.role));

            axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth/`, formDataJsonBasicAuth, {
                auth: {
                    username: getCookie("user")?.email,
                    password: getCookie("user")?.password
                }
            }).then((res)=>{
                console.log(res);
            }).catch(error=>{
                console.log(error);
            });

            axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${routToAssociatedRoleMapping(formValue.role)}.subjects`, formDataJsonRoleMapping, {
                auth: {
                    username: getCookie("user")?.email,
                    password: getCookie("user")?.password
                }
            }).then((res)=>{
                console.log(res);
            }).catch(error=>{
                console.log(error);
            });
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
                <h4>Edit account</h4>
                <hr/>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formUsername">
                        <Form.Label column sm={2}>
                            Username
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="email" type="email" placeholder="Username" value={formValue.email}
                                          onChange={handleChange} required/>
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
                            <Form.Control name="password" type="password" placeholder="Password" value={formValue.password}
                                          onChange={handleChange} required/>
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
                                    required
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
                            <Button type="submit">
                                Submit edited account
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </Fragment>
    );
}

export default EditAccount;