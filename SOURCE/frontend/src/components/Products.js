import React from "react"
import { Col, Card } from "react-bootstrap";

const Products = ({product,docs}) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="shadow" onClick={()=>docs(product)} style={{cursor: 'pointer'}}>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>
                        {product.name} <strong>({product.code})</strong>
                    </Card.Title>
                    <Card.Text>
                       {product.doc}
                    </Card.Text>
                </Card.Body>
            </Card>

        </Col>
    )
}
export default Products;
