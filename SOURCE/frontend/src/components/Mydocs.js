import React, {Component} from 'react';
import {Col, ListGroup, Row} from "react-bootstrap";

class Mydocs extends Component {
    render() {
        const{ chooseDocs } =this.props
        return (
            <Col md={2} mt="2">
                <h4><strong>My Document</strong></h4>
                <hr />
                {chooseDocs.length !==0 &&
                    <ListGroup variant="flush">
                        {chooseDocs.map((alldocs)=>(
                            <ListGroup.Item>
                                <Row>
                                        <h5>{alldocs.product.name}</h5>
                                        <p>{alldocs.product.doc}</p>
                                </Row>
                            </ListGroup.Item>
                            ))}
                    </ListGroup>
                }

            </Col>
        );
    }
}

export default Mydocs;