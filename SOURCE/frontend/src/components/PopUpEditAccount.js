// import {Button, Col, Form, Modal, Row} from "react-bootstrap";
// import React, {useState} from "react";
// import axios from "axios";
// import {API_URL} from "../utils/constanst";
// import editAccount from "../Pages/EditAccount";
//
// const PopUpEditAccount = ({ showModal, handleClose, accID }) => {
//
//     const [validated, setValidated] = useState(false);
//
//     const handleSubmit = (event) => {
//         const form = event.currentTarget;
//         if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//
//         setValidated(true);
//
//         if (!(formValue.email === "" || formValue.email === null || formValue.password === "" || formValue.password === null || formValue.role === "" || formValue.role === null )){
//             editAccount();
//         }
//     };
//
//     const [formValue, setformValue] = React.useState({
//         email: '', //formData.value[0].value[0].idShort,
//         password: '',
//         role: ''
//     });
//     function handleEdit() {
//
//         if(accID !== "" || accID !== null) {
//
//             console.log(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth.${accID}`);
//
//             axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth.${accID}`, {
//                 auth: {
//                     username: localStorage.getItem("email"),
//                     password: localStorage.getItem("password")
//                 }
//             }).then(async (res) => {
//                 console.log(res);
//                 if (res.status === 204) {
//                     alert("File deleted successfully.");
//                 } else {
//                     alert("The deletion of the file could not be executed. Please try again.")
//                 }
//             }).catch(error => {
//                 console.log(error);
//             });
//
//             axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping3.subjects.${accID}`, {
//                 auth: {
//                     username: localStorage.getItem("email"),
//                     password: localStorage.getItem("password")
//                 }
//             }).then(async (res) => {
//                 console.log(res);
//                 if (res.status === 204) {
//                     alert("File deleted successfully.");
//                 } else {
//                     alert("The deletion of the file could not be executed. Please try again.")
//                 }
//             }).catch(error => {
//                 console.log(error);
//             });
//
//             // axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth/${accID}`, {
//             //     auth: {
//             //         username: localStorage.getItem("email"),
//             //         password: localStorage.getItem("password")
//             //     }
//             // }).then(async (res) => {
//             //     console.log(res);
//             //     if (res.status === 204) {
//             //         alert("File deleted successfully.");
//             //     } else {
//             //         alert("The deletion of the file could not be executed. Please try again.")
//             //     }
//             // }).catch(error=>{
//             //     console.log(error);
//             // });
//         }
//     }
//
//     return (
//         <Modal show={showModal} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Delete</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                     <Form.Group as={Row} className="mb-3" controlId="formUsername">
//                         <Form.Label column sm={2}>
//                             Username
//                         </Form.Label>
//                         <Col sm={10}>
//                             <Form.Control name="email" type="email" placeholder="Username" value={formValue.email}
//                                           onChange={handleChange} required/>
//                             <Form.Control.Feedback type="invalid">
//                                 Please provide a valid email as username.
//                             </Form.Control.Feedback>
//                         </Col>
//                     </Form.Group>
//
//                     <Form.Group as={Row} className="mb-3" controlId="formPassword">
//                         <Form.Label column sm={2}>
//                             Password
//                         </Form.Label>
//                         <Col sm={10}>
//                             <Form.Control name="password" type="password" placeholder="Password" value={formValue.password}
//                                           onChange={handleChange} required/>
//                             <Form.Control.Feedback type="invalid">
//                                 Please provide a password.
//                             </Form.Control.Feedback>
//                         </Col>
//                     </Form.Group>
//
//                     <fieldset>
//                         <Form.Group as={Row} className="mb-3">
//                             <Form.Label as="legend" column sm={2}>
//                                 Role
//                             </Form.Label>
//                             <Col sm={10}>
//                                 <Form.Check
//                                     type="radio"
//                                     value="isNotAuthenticated"
//                                     label="basic"
//                                     name="role"
//                                     id="formRoleBasic"
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <Form.Check
//                                     type="radio"
//                                     value="isAuthenticatedUser"
//                                     label="advanced"
//                                     name="role"
//                                     id="formRoleAdvanced"
//                                     onChange={handleChange}
//                                 />
//                                 <Form.Check
//                                     type="radio"
//                                     value="isAuthenticatedSecurityUser"
//                                     label="admin"
//                                     name="role"
//                                     id="formRoleAdmin"
//                                     onChange={handleChange}
//                                 />
//                             </Col>
//                         </Form.Group>
//                     </fieldset>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="btn btn-primary btn-sm" onClick={handleClose}>
//                     Close
//                 </Button>
//                 <Button type="submit">
//                     Submit edited account
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };
//
// export default PopUpEditAccount;
