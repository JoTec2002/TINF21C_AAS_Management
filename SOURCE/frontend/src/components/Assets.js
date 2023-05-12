import React, {Component} from 'react';
import {Col, Form, Button} from "react-bootstrap";
import axios from "axios";
import {API_URL} from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import {setErrorHandling} from "./errorHandling";
import {getCookie} from "./helpers";

export default class Assets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shells: [],
            loading: true,
            searchTerm: "",
            activeProdukt: null
        }
    }

    onSearchTermChange = (event) => {
        const searchTerm = event.target.value;
        this.setState({searchTerm});
    }

    componentDidMount() {
        axios.get(API_URL + "shells", {
            auth: {
                username: getCookie("user")?.email,
                password: getCookie("user")?.password
            }
        })
            .then(res => {
                console.log("Response : ", res);
                const shells = res.data;
                this.setState({shells, loading: false});
            })
            .catch(error => {
                setErrorHandling(error);
                this.setState({loading: false});
            })
    }

    chooseShell = (produktId) => {
        this.setState({activeProdukt: produktId});
        this.props.onSelect(produktId);
    }

    render() {
        const {shells, loading = true, searchTerm} = this.state;

        const filteredShells = shells.filter((shell) =>
            shell.idShort.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return (
            <Col xs={6} md={4}>
                <h4>
                    <strong>Assets</strong>
                </h4>
                <hr/>

                {getCookie("user")?.email ? (
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button variant="primary" style={{margin: "auto auto 0.6em auto"}} href={"#/addAsset"}> Add Asset </Button>
                    </div>
                ) : (<a></a>)}

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

                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h4 style={{marginLeft: 10}}> Loading ...</h4>
                    </div>


                ) : (

                    <Col xs={6} md={4} className='scrollbox'>
                        <Col className='scrollbox-inner'>

                            {filteredShells && filteredShells.map((shells) => (
                                <div key={shells.id}
                                     className={`assets ${shells.id === this.state.activeProdukt ? "active" : ""}`}
                                     onClick={() => this.chooseShell(shells.id)}
                                     id={shells.id}
                                >
                                    <h6 style={{margin: 0}}>{shells.idShort}</h6>
                                </div>
                            ))}

                        </Col>
                    </Col>

                )}

            </Col>


        )
    }
}