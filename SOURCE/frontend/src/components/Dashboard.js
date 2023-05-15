import React, {Component} from "react";
import {BsPencilSquare, BsTrash} from "react-icons/bs";
import {Button, Col, Form, Table} from "react-bootstrap";
import PopUpDelete from "./PopUpDelete";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {API_URL} from "../utils/constanst";
import {setErrorHandling} from "./errorHandling";
import PopUpEditAccount from "./PopUpEditAccount";
import PopUpAddAccount from "./PopUpAddAccount";
import {getCookie} from "./helpers";

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
                username: getCookie("user")?.email,
                password: getCookie("user")?.password
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

    handleAdd = async (formValue) => {

        const formDataBasicAuth = `{"idShort":"${formValue.email}","kind":"Instance","semanticId":{"type":"GlobalReference","keys":[]},"dataSpecifications":[],"valueType":"xs:string","value":"${formValue.password}","modelType":"Property"}`;
        const formDataRoleMapping = `{"idShort": "${formValue.email}", "kind": "Instance","semanticId": {"type": "GlobalReference","keys": []},"dataSpecifications": [],"valueType": "xs:string","value": "","modelType": "Property"}`;

        // store the states in the formDataJson
        const formDataJsonBasicAuth = JSON.parse(formDataBasicAuth);
        const formDataJsonRoleMapping = JSON.parse(formDataRoleMapping);

        console.log("Username: " + formValue.email);
        console.log("Password: " + formValue.password);
        console.log("Role: " + formValue.role);

        console.log(formDataJsonBasicAuth);
        console.log(formDataJsonRoleMapping);


        //add user to auth user
        //therefore
        //1. get all current users
        //2. Add new user to this list
        //3. Update useres on server

        await axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, {
            auth: {
                username: getCookie("user")?.email,
                password: getCookie("user")?.password
            }
        }).then((res) => {
            let dataResBasicAuth = res.data;
            dataResBasicAuth.value.push(formDataJsonBasicAuth);

            console.log("New basicAuth Submodel : ", dataResBasicAuth);

            axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, dataResBasicAuth, {
                auth: {
                    username: getCookie("user")?.email,
                    password: getCookie("user")?.password
                }
            }).then((res) => {
                console.log("basic auth put res", res);
                axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.sortRole(formValue.role))}.subjects`, {
                    auth: {
                        username: getCookie("user")?.email,
                        password: getCookie("user")?.password
                    }
                }).then((res) => {
                    let dataResRoleMapping = res.data;
                    dataResRoleMapping.value.push(formDataJsonRoleMapping)

                    console.log("New roleMapping : ", dataResRoleMapping);

                    axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.sortRole(formValue.role))}.subjects`, dataResRoleMapping, {
                        auth: {
                            username: getCookie("user")?.email,
                            password: getCookie("user")?.password
                        }
                    }).then((res) => {
                        window.location.reload(false);
                        console.log(res);
                    }).catch(error => {
                        setErrorHandling(error)
                    });
                }).catch(error => {
                    setErrorHandling(error)
                });
            }).catch(error => {
                setErrorHandling(error);
            });
        }).catch(error => {
            setErrorHandling(error);
        });
    };

    handleDelete = async () => {

        await axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.specificUser[1])}.subjects`, {
            auth: {
                username: getCookie("user")?.email,
                password: getCookie("user")?.password
            }
        }).then(async (res) => {
            let users = res.data.value;

            console.log("Response roleMapping : ", users);
            console.log(users[0].idShort.trim !== this.specificUser[0].trim);

            let dataFilteredUser = users.filter((user) => {
                return user.idShort.trim() !== this.specificUser[0].trim();
            });

            res.data.value = dataFilteredUser;
            console.log("Filtered Response roleMapping : ", dataFilteredUser);

            axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.specificUser[1])}.subjects`, res.data, {
                auth: {
                    username: getCookie("user")?.email,
                    password: getCookie("user")?.password
                }
            }).then((res) => {
                console.log("roleMapping Put-Res", res);
                if (res.status === 204) {
                    console.log("File deleted successfully in roleMapping");
                    window.location.reload(false);
                } else {
                    console.log("File could not be deleted in roleMapping");
                    alert("File could not be deleted");
                }
            }).catch(error => {
                setErrorHandling(error);
            });
        }).catch(error => {
            setErrorHandling(error);
        });
    };

    handleEdit = async (formValue) => {

        await this.handleDelete();

        const formDataBasicAuth = `{"idShort":"${formValue.email}","kind":"Instance","semanticId":{"type":"GlobalReference","keys":[]},"dataSpecifications":[],"valueType":"xs:string","value":"${formValue.password}","modelType":"Property"}`;
        const formDataRoleMapping = `{"idShort": "${formValue.email}", "kind": "Instance","semanticId": {"type": "GlobalReference","keys": []},"dataSpecifications": [],"valueType": "xs:string","value": "","modelType": "Property"}`;
        const formDataJsonBasicAuth = JSON.parse(formDataBasicAuth);
        const formDataJsonRoleMapping = JSON.parse(formDataRoleMapping);

        await axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, {
            auth: {
                username: getCookie("user")?.email,
                password: getCookie("user")?.password
            }
        }).then((res) => {
            let dataResBasicAuth = res.data;
            dataResBasicAuth.value.push(formDataJsonBasicAuth);

            console.log("New basicAuth Submodel : ", dataResBasicAuth);

            axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/basicAuth`, dataResBasicAuth, {
                auth: {
                    username: getCookie("user")?.email,
                    password: getCookie("user")?.password
                }
            }).then((res) => {
                if (res.status === 204) {
                    console.log("File deleted successfully in basicAuth : ", res);
                } else {
                    console.log("File could not be deleted in basicAuth : ", res);
                }

                axios.get(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.sortRole(formValue.role))}.subjects`, {
                    auth: {
                        username: getCookie("user")?.email,
                        password: getCookie("user")?.password
                    }
                }).then((res) => {
                    let dataResRoleMapping = res.data;
                    dataResRoleMapping.value.push(formDataJsonRoleMapping)

                    console.log("New roleMapping : ", dataResRoleMapping);

                    axios.put(`${API_URL}submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping.roleMapping${this.routToAssociatedRoleMapping(this.sortRole(formValue.role))}.subjects`, dataResRoleMapping, {
                        auth: {
                            username: getCookie("user")?.email,
                            password: getCookie("user")?.password
                        }
                    }).then((res) => {
                        console.log(res);
                        if (res.status === 204) {
                            console.log("File updated successfully in roleMapping : ", res);
                            window.location.reload(false);
                        } else {
                            console.log("File could not be updated in roleMapping : ", res);
                        }
                    }).catch(error => {
                        setErrorHandling(error)
                    });
                }).catch(error => {
                    setErrorHandling(error)
                });
            }).catch(error => {
                setErrorHandling(error);
            });
        }).catch(error => {
            setErrorHandling(error);
        });
    };

    handleShow = ( whichModal, user = undefined) => {
        this.sortModal = whichModal;
        if (user !== undefined)
            this.specificUser = user;

        this.setState({
            showModal: true,
        });
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
                                                <Button variant="text btn-sm" onClick={() => this.handleShow("edit", user)}>
                                                    <BsPencilSquare />
                                                </Button>
                                                <Button variant="text btn-sm" onClick={() => this.handleShow("delete", user)}>
                                                    <BsTrash />
                                                </Button>
                                            </div>
                                        ) : (<div></div>)}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button onClick={() => this.handleShow("create")} variant="outline-primary btn-sm">
                            Create Account
                        </Button>
                        {
                            (this.sortModal === "edit") ?
                                (<PopUpEditAccount handleClose={this.handleClose} {...this.state} handleEdit={this.handleEdit} user={this.specificUser}/>) :
                                ((this.sortModal === "delete") ?
                                    (<PopUpDelete handleClose={this.handleClose} {...this.state} handleDelete={this.handleDelete}/>) :
                                    (<PopUpAddAccount handleClose={this.handleClose} {...this.state} handleAdd={this.handleAdd}/>))
                        }
                    </div>
                )
                }
            </Col>
        );
    }
}
