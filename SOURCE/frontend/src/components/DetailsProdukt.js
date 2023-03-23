import React, {useState} from "react"
import {Col, Card, Row, Button, ListGroup, Container} from "react-bootstrap";





const DetailsProdukt = () => {

    return (
            <Col md={6} mt="2">
                <h4>
                   <strong>Details Produkt</strong>
                 </h4>
                <hr />
                <Row>

                    <Col md={6} xs={6}>
                        <Card style={{border:"none"}} ><Card.Img variant="top" src="https://ccae4836-001e-48c2-a4f9-235554f9400b.ma.bw-cloud-instance.org/submodels/d3d3LmV4YW1wbGUuY29tL2lkcy9zbS8zMjAyXzAyMzFfNTAyMl81NDA1/submodelelements/GeneralInformation.ProductImage01/attachment" />
                        </Card>
                    </Col>
                    <Col md={6} xs={6}>
                        <Card  style={{ border:"none"}}>
                            <Card.Header>
                                <Card.Title>Norgren_B84G_4GK_AP3_RME</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Herstellername
                                        <Card.Text>-------</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Herstellerproduktbeziehung
                                        <Card.Text>-------</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Abteilung
                                        <Card.Text>-------</Card.Text>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Adresse
                                        <Card.Text>--------------</Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Button variant="primary">Download</Button>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Button variant="info">Produkt Hinzufügen</Button>
                    </Row>

            </Col>

    )
}
export default DetailsProdukt

