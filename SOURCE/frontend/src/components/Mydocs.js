import React, {Component} from 'react';
import {Col, ListGroup, Row} from "react-bootstrap";

export default class Mydocs extends Component {
    render() {
        //const{ chooseDocs } =this.props
        return (
            <Col md={2} mt="2">
                <h4>
                    <strong></strong>
                    <strong>Dokumente</strong>
                </h4>
                <hr />
            </Col>
        )
    }
}