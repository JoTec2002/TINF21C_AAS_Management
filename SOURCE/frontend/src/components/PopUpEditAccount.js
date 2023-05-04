import { Button, Form, Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import React, {useState} from "react";

const PopUpEditAccount = ({ showModal, handleClose, handleEdit, user }) => {

    const [validated, setValidated] = useState(false);

    const [formValue, setformValue] = React.useState({
        email: (user === []) ? (''):(user[0]),
        password: '',
        role: (user === []) ? (''):(user[1])
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleEdit}>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-primary btn-sm" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="btn btn-success btn-sm" type="submit">
                    Submit edited account
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PopUpEditAccount;