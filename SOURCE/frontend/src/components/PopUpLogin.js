import {useState,} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {API_URL} from "../utils/constanst";
import axios from "axios";
import {deleteCookie} from "./helpers";
import {setErrorHandling} from "./errorHandling";

const PopUpLogin = ({showModal, handleClose, loggedIn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loginStatus, setLoginStatus] = useState("");

    const handleLogout = () => {
        deleteCookie("user");
        window.location.reload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, {
            auth: {
                username: email,
                password: password
            }
        })
            .then((res) => {
                if (res?.status === 200) {
                    setEmail(email);
                    setPassword(password);

                    axios.get(API_URL + "submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping", {
                        auth: {
                            username: email,
                            password: password
                        }
                    })
                        .then(res => {
                            const roleMappings = res.data.value;
                            roleMappings.forEach(roleMapping => {
                                roleMapping.value[0].value.forEach(user => {
                                    if (user.idShort === email) {
                                        let role = roleMapping.value[1].value[0].idShort;
                                        if (remember) {
                                            console.log("remember");
                                            document.cookie = "user=" + JSON.stringify({
                                                email: email,
                                                password: password,
                                                role: role
                                            }) + ";max-age=2592000";
                                        } else {
                                            document.cookie = "user=" + JSON.stringify({
                                                email: email,
                                                password: password,
                                                role: role
                                            })
                                        }
                                        console.log("Login sucessfully")
                                        window.location.reload();
                                    }
                                });
                            })
                        })
                        .catch(error => {
                            console.log("Login failed", error)
                            setLoginStatus("Login Failed")
                            setErrorHandling(error)
                        })
                }
            })
            .catch(async (error) => {
                console.log("Login failed", error)
                setLoginStatus("Login Failed")
            })
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>AAS Management</Modal.Title>
            </Modal.Header>

            {!loggedIn ? (
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me (30 days)"
                                        onChange={(e) => setRemember(e.target.checked)}/>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Login
                        </Button>
                    </Form>
                    <p style={{background: "red", marginTop: "0.4em"}}>{loginStatus}</p>
                </Modal.Body>
            ) : (
                <Modal.Body>
                    <div>
                        <p>You are logged in as {email}.</p>
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Modal.Body>
            )}
        </Modal>
    );
};

export default PopUpLogin;