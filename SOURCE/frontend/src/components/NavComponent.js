
import{Button,Container,Navbar,Nav,NavDropdown}from "react-bootstrap";
import { IoSettings } from "react-icons/io5";
import {Component} from "react";
import PopUpLogin from "./PopUpLogin";

export default class NavComponent extends Component {
    constructor(props) {
        super(props)
        this.state={
            showModal:false,
            username:'',
            password:'',
        }
    }
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
    render() {
        return (
            <Navbar variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home"> <strong>AAS Management</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">startpage</Nav.Link>
                            <Nav.Link href="admin">Admin Dashboard</Nav.Link>
                            <Nav.Link href="home">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav><Button variant="success" onClick={()=>this.handelShow()}>Login</Button></Nav>
                            <PopUpLogin handleClose={this.handleClose} { ...this.state }/>
                            <NavDropdown title=<IoSettings/> id="basic-nav-dropdown" >
                                <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item style={{backgroundColor:"red"}} href="/">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                 </Container>
            </Navbar>
    )
    }

}


