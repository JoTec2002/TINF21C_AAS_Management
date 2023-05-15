import { Button, Form, Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import React, {useState} from "react";

const PopUpAddAccount = ({ showModal, handleClose, handleAdd }) => {

    const [validated, setValidated] = useState(false);

    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
        role: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (!(formValue.email === "" || formValue.email === null || formValue.password === "" || formValue.password === null || formValue.role === "" || formValue.role === null)) {
            handleAdd(formValue);
        }
    };

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3" controlId="formUsername">
                        <Form.Label column sm={2}>
                            Username
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control name="email" type="email" placeholder="Username"
                                          value={formValue.email}
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
                            <Form.Control name="password" type="password" placeholder="Password"
                                          value={formValue.password}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-primary btn-sm" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-success btn-sm" type="submit">
                        Submit edited account
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PopUpAddAccount;