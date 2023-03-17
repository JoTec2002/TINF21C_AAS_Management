import React from "react"
import { Col, Card ,Row , Button} from "react-bootstrap";

const Products = ({shells}) => {
    return (
        <div>

            <Row className="mb-4">
                <Card className="shadow">
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{shells.idShort}</Card.Title>

                        <Card.Text>
                            <Row>id : {shells.id}</Row>
                            <Row>modelType: {shells.modelType}</Row>
                        </Card.Text>

                        <Button variant="primary">Download</Button>
                    </Card.Body>
                </Card>
            </Row>
        </div>
    )
}
export default Products;
/*<Card className="shadow" onClick={()=>docs(product)} style={{cursor: 'pointer'}}>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>
                        {product.name} <strong>({product.code})</strong>
                    </Card.Title>
                    <Card.Text>
                       {product.doc}
                    </Card.Text>
                </Card.Body>
            </Card>*/
