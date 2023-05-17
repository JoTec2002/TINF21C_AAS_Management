import {Button, Navbar, Nav, Form, NavDropdown} from "react-bootstrap";
import {Component} from "react";
import PopUpLogin from "./PopUpLogin";
import {API_URL} from "../utils/constanst";
import {deleteCookie, getCookie} from "./helpers";

export default class NavComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            username: '',
            password: '',
            loggedIn: false,
            server: '',
        }
    }

    componentDidMount() {
        if (localStorage.getItem("server") === null) {
            localStorage.setItem("server", API_URL);
        }
        this.setState({server: localStorage.getItem("server")})
        const user = getCookie("user");
        console.log(user);
        if (user) {
            this.setState({loggedIn: true});
        }
    }

    handelShow = () => {
        this.setState({
            showModal: true,

        })
    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleLogout = () => {
        deleteCookie("user");
        window.location.reload(false);
    };

    // save url in localstorage,if doesn't empty replace it
    handleURL = (e) => {
        e.preventDefault();
        if (localStorage.getItem("server")) {
            localStorage.setItem("server", "");
            localStorage.setItem("server", this.state.server);
            window.location.reload(false);
        }
        localStorage.setItem("server", this.state.server);
        window.location.reload(false);
    };

    render() {
        const {loggedIn} = this.state;

        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand href="#" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '2%', marginRight: '2%'}}>
                    <span><strong>AAS Management</strong></span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{marginRight: "10px"}}>
                    <Nav.Item className={"text-white"}>
                            <Form className="d-flex server" onSubmit={this.handleURL}>
                                <Form.Control type="text"
                                              className="me-2"
                                              aria-label="Search"
                                              value={this.state.server}
                                              onChange={(e) => this.setState({server: e.target.value})}
                                />

                                <Button variant="success" onClick={this.handleURL} type="submit">Change</Button>

                            </Form>
                    </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#/">Home</Nav.Link>
                        {(getCookie("user")?.role === "isAuthenticatedSecurityUser") ? (
                            <Nav>
                                <Nav.Link href="#/admin">User management</Nav.Link>
                                <Nav.Link href="#/addAsset">Add Asset</Nav.Link>
                            </Nav>
                           ) : (<></>)}
                    </Nav>
                    <Nav className="ms-auto" style={{marginRight: "5%"}}>
                        {!loggedIn ? (
                            <Nav.Item>
                            <Button variant="success" onClick={() => this.handelShow()}>Login</Button>
                            </Nav.Item>
                        ) : (
                            <NavDropdown id="basic-nav-dropdown" title={getCookie("user")?.email}>
                                <NavDropdown.Item><Button
                                    size="sm"
                                    variant="danger"
                                    style={{marginLeft: 10}}
                                    onClick={() => {
                                        this.handleLogout();
                                        this.setState({loggedIn: false});
                                    }}>Logout</Button></NavDropdown.Item>
                            </NavDropdown>
                        )}
                        <PopUpLogin
                            handleClose={this.handleClose}
                            {...this.state}
                        />

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        );
    }

}
