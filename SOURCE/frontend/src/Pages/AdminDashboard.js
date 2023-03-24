import {NavComponent} from "../components";
import { Col, ListGroup,Row, Button, Table, Container  } from "react-bootstrap";
import {Component} from "react";
import PopUpLogin from "../components/PopUpLogin";

export default class AdminDashboard extends Component{

    render(){
    return(
        <di>
        <NavComponent/>
            <Container fluid>
            <Row style={{marginTop:"2.5rem"}}>
            <Col md={3} mt="2">
                <ListGroup >
                    <ListGroup.Item>User</ListGroup.Item>
                    <ListGroup.Item>Admin</ListGroup.Item>


                </ListGroup>
            </Col>
            <Col md={8} mt="2">
                <Button variant="primary" href="adduser" >
                   Add User
                </Button>

                <Table striped>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@otto</td>
                        <td><Button variant="primary">Passwort Zurücksetzen </Button><Button variant="danger">Löschen</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@jacob</td>
                        <td><Button variant="primary">Passwort Zurücksetzen </Button><Button variant="danger">Löschen</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@larry</td>
                        <td><Button variant="primary">Passwort Zurücksetzen</Button><Button variant="danger">Löschen</Button></td>
                    </tr>
                    </tbody>
                </Table>

            </Col>
            </Row>
            </Container>

        </di>

    )
    }
}