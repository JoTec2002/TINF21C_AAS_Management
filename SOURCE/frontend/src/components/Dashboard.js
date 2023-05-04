import React, {Component} from "react";
import {BsPencilSquare, BsTrash} from "react-icons/bs";
import {Button, Col, Form, Table} from "react-bootstrap";
import PopUpDelete from "./PopUpDelete";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {API_URL} from "../utils/constanst";
import {setErrorHandling} from "./errorHandling";
import PopUpEditAccount from "./PopUpEditAccount";

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            loading: true,
            searchTerm: "",
        }
        this.specificUser = [];
        this.sortModal = "";
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
                setErrorHandling(error)
            })
    }

    handleDelete = () => {
        //console.log(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth.${user}`);
        axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.specificUser[1])}.subjects`, {
            auth: {
                username: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }
        }).then(async (res) => {
            let users = res.data.value;

            console.log(users[1].idShort, this.specificUser[0], users[0].idShort.trim !== this.specificUser[0].trim);

            //TODO here filter doesnt work I'dont know why futher trubbelshooting
            users.filter((user) => {
                console.log(user.idShort, this.specificUser[0], user.idShort.trim() !== this.specificUser[0].trim());
                return user.idShort.trim() !== this.specificUser[0].trim()
            });

            console.log(users);


        }).catch(error => {
            setErrorHandling(error);
        });

        axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, {
            auth: {
                username: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }
        }).then(async (res) => {
            console.log(res);
        }).catch(error => {
            setErrorHandling(error);
        });


    }

    handleEdit = () => {
        //console.log(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth.${user}`);
        axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.specificUser[1])}.subjects`, {
            auth: {
                username: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }
        }).then(async (res) => {
            let users = res.data.value;

            console.log(users[1].idShort, this.specificUser[0], users[0].idShort.trim !== this.specificUser[0].trim);

            //TODO here filter doesnt work I'dont know why futher trubbelshooting
            users.filter((user) => {
                console.log(user.idShort, this.specificUser[0], user.idShort.trim() !== this.specificUser[0].trim());
                return user.idShort.trim() !== this.specificUser[0].trim()
            });

            console.log(users);


        }).catch(error => {
            setErrorHandling(error);
        });

        axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, {
            auth: {
                username: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }
        }).then(async (res) => {
            console.log(res);
        }).catch(error => {
            setErrorHandling(error);
        });


    }

    handleShow = (user, whichModal) => {
        this.setState({
            showModal: true,
        });
        this.specificUser = user;
        this.sortModal = whichModal;
        console.log(this.specificUser);
    }

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
    routToAssociatedRoleMapping(authRes) {
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
                            <tr key={"Header"}>
                                <th>Account</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredusers && filteredusers.map((user) => (
                                <tr key={user[0]}>
                                    <td>{`${user[0]}`}</td>
                                    <td>{`${user[1]}`}</td>
                                    <td>
                                        {!(user[0] === "anonymous") ? (
                                            <div>
                                                <Button variant="text btn-sm" onClick={() => this.handleShow(user, "edit")}>
                                                    <BsPencilSquare />
                                                </Button>
                                                <Button variant="text btn-sm" onClick={() => this.handleShow(user, "delete")}>
                                                    <BsTrash />
                                                </Button>
                                            </div>
                                        ) : (<div></div>)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button href="#/create" variant="outline-primary btn-sm">
                            Create Account
                        </Button>
                        {
                            (this.sortModal === "edit") ?
                                (<PopUpEditAccount handleClose={this.handleClose} {...this.state} handleEdit={this.handleEdit} user={this.specificUser}/>)
                                :
                                (<PopUpDelete handleClose={this.handleClose} {...this.state} handleDelete={this.handleDelete}/>)
                        }
                    </div>
                )
                }
            </Col>
        );
    }
}
