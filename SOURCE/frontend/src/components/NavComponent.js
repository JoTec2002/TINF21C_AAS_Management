import { Button, Container, Navbar, Nav, Form } from "react-bootstrap";
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
            server:'',
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
        window.location.reload(false);
    };
    // save url in localstorage,if doesn't empty replace it


    handleURL=(e)=>{
        e.preventDefault();
        if(localStorage.getItem("server")){
            localStorage.setItem("server","");
            localStorage.setItem("server",this.state.server);
            window.location.reload(false);
        }
        localStorage.setItem("server",this.state.server);
        window.location.reload(false);


    };
    render() {
        const { loggedIn } = this.state;
        const {server}= this.state.server;
        if(localStorage.getItem("server") === null){
            localStorage.setItem("server", API_URL);
        }
        return (

          <Navbar variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="#">
                <strong>AAS Management</strong>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav.Item className={"text-white"}>
                    <div className="server" >
                        <Form className="d-flex" >
                            <Form.Control type="text" onSubmit={this.handleURL}

                                          placeholder={"current server: "+localStorage.getItem("server")}
                                          className="me-2"
                                          aria-label="Search"
                                          value={server}
                                          onChange={(e) => this.setState({server: e.target.value})}
                            />
                            <Button onClick={this.handleURL} variant="success" type="submit">Change</Button>
                        </Form>
                    </div>
                </Nav.Item>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">

                            {!loggedIn ? (
                                <Button variant="success" onClick={() => this.handelShow()}>Login</Button>
                            ) : (
                                <div className="d-flex align-items-center">
                                    <p className="my-0 me-3 text-white">{localStorage.getItem('email')}</p>

                                    <Button variant="primary" style={{ marginLeft: 10 }} href={"#/addAsset"}> Add Asset </Button>
                                    <Button
                                        variant="danger"
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                            this.handleLogout();
                                            this.setState({ loggedIn: false });
                                        }}>Logout</Button>
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
