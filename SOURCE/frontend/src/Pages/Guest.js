import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Component} from "react";
import {Col,Row, Container} from "react-bootstrap";

export default class Guest extends Component{
    render(){
        return(
            <div>
            <NavComponent/>
            <div className="mt2">
                <Container fluid>
                    <Row>
                        <Produkte/>
                        <DetailsProdukt/>
                    </Row>
                </Container>
            </div>
            </div>
        )
    }
}