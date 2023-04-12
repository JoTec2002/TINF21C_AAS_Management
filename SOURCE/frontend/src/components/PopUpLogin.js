import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const PopUpLogin = ({ showModal, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (email && password) {
      setEmail(email);
      setPassword(password);
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setLoggedIn(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setLoggedIn(true);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>AAS Management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!loggedIn ? (
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
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="success" type="submit">
              Login
            </Button>
          </Form>
        ) : (
          <div>
            <p>You are logged in as {email}.</p>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Modal.Body>

    </Modal>
  );
};

export default PopUpLogin;
