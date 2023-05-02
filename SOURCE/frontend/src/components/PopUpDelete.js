import { Button, Form, Modal } from "react-bootstrap";
import React from "react";
import axios from "axios";
import {API_URL} from "../utils/constanst";

const PopUpDelete = ({ showModal, handleClose, accID }) => {
    function handleDelete(accID){

        console.log(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth.${accID}`);

        axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, {
            auth: {
                username: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }
        }).then(async (res) => {
            console.log(res);
        }).catch(error=>{
            console.log(error);
        });

        axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping3.subjects`, {
            auth: {
                username: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }
        }).then(async (res) => {
            console.log(res);
            // if (res.status === 204) {
            //     alert("File deleted successfully.");
            // } else {
            //     alert("The deletion of the file could not be executed. Please try again.")
            // }
        }).catch(error=>{
            console.log(error);
        });

        // axios.delete(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth/${accID}`, {
        //     auth: {
        //         username: localStorage.getItem("email"),
        //         password: localStorage.getItem("password")
        //     }
        // }).then(async (res) => {
        //     console.log(res);
        //     if (res.status === 204) {
        //         alert("File deleted successfully.");
        //     } else {
        //         alert("The deletion of the file could not be executed. Please try again.")
        //     }
        // }).catch(error=>{
        //     console.log(error);
        // });
    }

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
        <Button variant="outline-danger btn-sm" onClick={handleDelete(accID)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpDelete;
