import {useState, useEffect} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {API_URL} from "../utils/constanst";
import axios from "axios";

const PopUpLogin = ({showModal, handleClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginStatus, setLoginStatus] = useState("");

    useEffect(() => {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (email && password) {

        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        setLoggedIn(false);
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
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    setLoggedIn(true);
                    console.log("Login sucessfully")
                    window.location.reload();
                }
            })
            .catch(async (error) => {
                console.log("Login failed")
                setLoginStatus("Login Failed")
                setLoggedIn(false)
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
                            <Form.Check type="checkbox" label="Remember me"/>
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