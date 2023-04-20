import { Button, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { IoSettings } from "react-icons/io5";
import { Component } from "react";
import PopUpLogin from "./PopUpLogin";
import {API_URL} from "../utils/constanst";

export default class NavComponent extends Component {


    constructor(props) {
        super(props)
        this.state={
            showModal:false,
            username:'',
            password:'',
            loggedIn: false,
        }
    }

    componentDidMount() {
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");
        if (email && password) {
          this.setState({ loggedIn: true });
        }
    }

    handleLogin = () => {
        this.setState({ loggedIn: true });
    };

    handelShow =()=>{
        this.setState({
            showModal:true,

        })
    }
    handleClose=()=>{
        this.setState({
            showModal:false
        })
    }

    handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        this.setState({ loggedIn: false });
    };
    
    render() {
        const { loggedIn } = this.state;
        return (
          <Navbar variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="#">
                <strong>AAS Management</strong>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Item className={"text-white"}><strong>current Server: </strong>{API_URL}</Nav.Item>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">

                    {!loggedIn ? (
                    <Button variant="success" onClick={() => this.handelShow()}>Login</Button>
                  ) : (
                    <div className="d-flex align-items-center">
                      <p className="my-0 me-3 text-white">{localStorage.getItem('email')}</p>
                      <Button
                        variant="danger"
                        onClick={() => {
                          this.handleLogout();
                          this.setState({ loggedIn: false });
                        }}>Logout</Button>
                      <Button variant="primary" style={{ marginLeft:10 }}> Add Asset </Button>
                        <Nav.Link href="#/admin">User management</Nav.Link>
                    </div>
                  )}
                  <PopUpLogin
                    loggedIn={loggedIn}
                    setLoggedIn={this.handleLogin}
                    handleClose={this.handleClose}
                    {...this.state}
                  />
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
      }

}
