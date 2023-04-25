import React, { Component } from 'react';
import { Col, Form, Button  } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import base64url from "base64url";

export default class Assets extends Component {
    constructor(props) {
        super(props)
        this.state={
            shells: [],
            loading: true,
            searchTerm: "",
            activeProdukt: null
        }
    }

    onSearchTermChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm });
    }

    componentDidMount() {
        axios.get(API_URL+"shells",{
            auth:{
                username:localStorage.getItem("email"),
                password:localStorage.getItem("password")
                }
            })
            .then(res => {
                console.log("Response : ", res);
                const shells = res.data;
                this.setState({ shells, loading: false });
            })
            .catch(error=>{
                console.log(error);
            })
    }

    chooseShell = (produktId) => {
        this.setState({ activeProdukt: produktId });
        this.props.onSelect(produktId);
    }

    render() {
        const { shells, loading = true, searchTerm } = this.state;

        const filteredShells = shells.filter((shell) =>
            shell.idShort.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const base64url = require('base64url');
        return (
            <Col md={4} mt="2">
                <h4>
                    <strong>Assets</strong>
                </h4>
                <hr/>

                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search Produkt Item ..."
                        className="me-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={this.onSearchTermChange}
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>

                {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:20 }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h4 style={{ marginLeft:10 }}> Loading ...</h4>
                    </div>
                ) : (
                    <div>
                        {filteredShells && filteredShells.map((shells) => (

                            <div  className={`produkt ${shells.idShort === this.state.activeProdukt ? "active" : ""}`}
                                onClick={() => this.chooseShell(shells.id)}
                                id={shells.id}>
                                <h6 style={{ margin: 0 }}>{shells.idShort}</h6>
                            </div>
                        ))}

                    </div>
                )}
            </Col>
        )
    }
}