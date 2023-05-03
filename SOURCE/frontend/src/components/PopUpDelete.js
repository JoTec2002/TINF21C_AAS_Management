import { Button, Form, Modal } from "react-bootstrap";
import React from "react";
import axios from "axios";
import {API_URL} from "../utils/constanst";

const PopUpDelete = ({ showModal, handleClose, user }) => {
    function routToAssociatedRoleMapping(authRes) {
        switch (authRes) {
            case "basic":
                return "1";
            case "advanced":
                return "2";
            case "admin":
                return "3";
            default:
                console.error("Undefined Authentication : ", authRes);
                return "500";
        }
    }
    function handleDelete(givenuser){
        if(givenuser) {
            //console.log(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth.${user}`);
            axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${routToAssociatedRoleMapping(user[1])}.subjects`, {
                auth: {
                    username: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                }
            }).then(async (res) => {
                let users = res.data.value;

                console.log(users[1].idShort,givenuser[0], users[0].idShort.trim !== givenuser[0].trim);

                //TODO here filter doesnt work I'dont know why futher trubbelshooting
                users.filter((user) => {console.log(user.idShort,givenuser[0], user.idShort.trim() !== givenuser[0].trim()); return user.idShort.trim() !== givenuser[0].trim()});

                console.log(users);


            }).catch(error => {
                console.log(error);
            });

            axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, {
                auth: {
                    username: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                }
            }).then(async (res) => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        }
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
        <Button variant="outline-danger btn-sm" onClick={()=>handleDelete(user)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpDelete;
