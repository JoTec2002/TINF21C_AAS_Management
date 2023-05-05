import { Button, Form, Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import React, {useState} from "react";

const PopUpEditAccount = ({ showModal, handleClose, handleEdit, user }) => {

    const [validated, setValidated] = useState(false);

    const [formValue, setFormValue] = React.useState({
        email: '',
        password: '',
        role: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        console.dir(event.target)
        formValue.email = event.target[0].value;
        formValue.password = event.target[1].value;
        for(let i = 3; i<6; i++){
            if(event.target[i].checked){
                formValue.role = event.target[i].value;
            }
        }

        console.log(formValue)

        //TODO
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        if (!(formValue.email === "" || formValue.email === null || formValue.password === "" || formValue.password === null || formValue.role === "" || formValue.role === null)) {
            handleEdit(formValue);
        }
    };

    const handleCloseForEdit = () => {
        handleClose();
        setFormValue({
            email: user[0],
            password: null,
            role: user[1]
        });
    };

    return (
        <Modal show={showModal} onHide={handleCloseForEdit}>
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
                            <Form.Control name="email" type="email" placeholder="Username" defaultValue={user[0]}
                                          required/>
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
                            <Form.Control name="password" type="password" placeholder="Password" defaultValue={""} required/>
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
                                    defaultValue={(user[1] === "basic")}
                                    required
                                />
                                <Form.Check
                                    type="radio"
                                    value="isAuthenticatedUser"
                                    label="advanced"
                                    name="role"
                                    id="formRoleAdvanced"
                                    defaultValue={(user[1] === "advanced")}
                                />
                                <Form.Check
                                    type="radio"
                                    value="isAuthenticatedSecurityUser"
                                    label="admin"
                                    name="role"
                                    id="formRoleAdmin"
                                    defaultValue={(user[1] === "admin")}
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-primary btn-sm" onClick={handleCloseForEdit}>
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

export default PopUpEditAccount;