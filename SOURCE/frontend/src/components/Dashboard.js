import React, {Component, useState} from "react";
import {BsPencilSquare, BsTrash} from "react-icons/bs";
import {Button, Col, Form, Table} from "react-bootstrap";
import PopUpDelete from "./PopUpDelete";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {API_URL} from "../utils/constanst";
import EditAccount from "../Pages/EditAccount";
import PopUpEditAccount from "./PopUpEditAccount";

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true,
            searchTerm: "",
        }
        this.specificUsername = "";
    }

    onSearchTermChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({searchTerm});
    }

    componentDidMount() {

        axios.get(API_URL + "submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping", {
            auth: {
                username: localStorage.getItem('email'),
                password: localStorage.getItem('password')
            }
        })
            .then(res => {
                console.log("Response : ", res);
                const shells = res.data.value;
                const users = [];
                shells.forEach(shell => {
                    let userRole = this.sortRole(shell.value[1].value[0].idShort);
                    let usernames = shell.value[0].value;
                    usernames.forEach(username => {
                        users.push([username.idShort, userRole])
                    })
                })
                this.setState({users, loading: false});
            })
            .catch(error => {
                console.log(error);
                //this.setState({globalerror: error});
                //errorHandlin.setState({globalerror: error});
            })
    }

    handleDeleteRequest = (user) => {
        this.handelShow();
        this.specificUsername = user[0];
        console.log(this.specificUsername);
    }

    handelShow = () => {
        this.setState({
            showModal: true,
        });
    };
    handleClose = () => {
        this.setState({
            showModal: false,
        });
    };

    sortRole(authRes) {
        switch (authRes) {
            case "isNotAuthenticated":
                return "basic";
            case "isAuthenticatedUser":
                return "advanced";
            case "isAuthenticatedSecurityUser":
                return "admin";
            default:
                console.error("Undefined Authentication : ", authRes);
                return "undefined";
        }
    }

    render() {
        const {users, loading = true, searchTerm} = this.state;

        const filteredusers = users.filter((user) =>
            user[0].toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <Col>
                <h4>
                    <strong>Admin Dashboard</strong>
                </h4>
                <hr/>

                {loading ? (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h4 style={{marginLeft: 10}}>Loading...</h4>
                    </div>
                ) : (
                    <div>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search Member ..."
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={this.onSearchTermChange}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Table striped>
                            <thead>
                            <tr>
                                <th>Account</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredusers && filteredusers.map((user) => (
                                <tr>
                                    <td>{`${user[0]}`}</td>
                                    <td>{`${user[1]}`}</td>
                                    <td>
                                        <Button href="#/edit" variant="text btn-sm">
                                            <BsPencilSquare/>
                                        </Button>
                                        <Button variant="text btn-sm" onClick={() => this.handleDeleteRequest(user)}>
                                            <BsTrash/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button href="#/create" variant="outline-primary btn-sm">
                            Create Account
                        </Button>
                        <PopUpDelete handleClose={this.handleClose} {...this.state} accID={this.specificUsername}/>
                    </div>
                )
                }
            </Col>
        );
    }
}
