import React, {useState} from "react"
import { Col, Card ,Row , Button} from "react-bootstrap";





const DetailsProdukt = () => {

    return (



            <Col md={6} mt="2">
                <h4>
                <strong></strong>
                <strong>Produkte</strong>
            </h4>
            <hr />
            <Row className="mb-4">
                <Card className="shadow">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Name Produkt</Card.Title>

                        <Card.Text>
                            <Row>id:Id Produkz</Row>
                            <Row>others</Row>
                        </Card.Text>

                        <Button variant="primary">Download</Button>
                    </Card.Body>
                </Card>
            </Row>
            </Col>

    )
}
export default DetailsProdukt

