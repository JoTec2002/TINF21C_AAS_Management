import { Button, Form, Modal } from "react-bootstrap";
import React from "react";

const PopUpDelete = ({ showModal, handleClose, handleDelete }) => {

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Text className="text">
            Are you sure you want to delete this Account?
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="btn btn-primary btn-sm" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-danger btn-sm" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpDelete;
