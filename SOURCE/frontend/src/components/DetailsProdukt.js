import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Row, Button, ListGroup,DropdownButton } from "react-bootstrap";
import { API_URL } from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import base64url from "base64url";

const DetailsProdukt = ({ data }) => {
    const [produktData, setProduktData] = useState(null);
    const [submodelElement, setSubmodelElement]= useState([]);
    const [idEncoded, setidEncoded]= useState([])
    const [loading, setLoading] = useState(false);
    data = base64url.fromBase64(window.btoa(data));

    const endcode=(id)=>{
        let idchange = base64url.fromBase64(window.btoa(id));
        return idchange;
    }

    const getSubmodel = (id)=>{
        setLoading(true)
        axios.get(`${API_URL}shells/${data}/submodels/${id}/submodel`,{
            auth:{
                username:localStorage.getItem("email"),
                password:localStorage.getItem("password")
                }
            })
            .then((res)=>{
                //console.log(res.data);
                setSubmodelElement(submodelElement => [...submodelElement, res.data]);
            })
            .catch((error) =>{
                console.error(error);
            })
            .finally(()=>{
                setLoading(false);
            })
    }

    useEffect(() => {
        setLoading(true); // نمایش صفحه لودینگ
        //reset details
        setProduktData(null);
        setSubmodelElement([]);
        setidEncoded([]);
        axios
            .get(`${API_URL}shells/${data}`,{
                auth:{
                    username:localStorage.getItem("email"),
                    password:localStorage.getItem("password")
                }
            })
            .then((res) => {
                setProduktData(res.data);
                let submodelsIdEncoded = [];
                for(let i=0; i<res.data.submodels.length; i++){
                    let submodelIdEncoded = endcode(res.data.submodels[i].keys[0].value);
                    submodelsIdEncoded.push(submodelIdEncoded);
                    getSubmodel(submodelIdEncoded);
                }
                console.log(res.data);
                setidEncoded(submodelsIdEncoded);
                console.log(submodelElement);

            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);// مخفی کردن صفحه لودینگ
            });

    }, [data]);

    if (loading) { // اگر درخواست به سرور فرستاده شده و پاسخ دریافت نشده باشد، نمایش صفحه لودینگ
        return (
            <Col md={8} style={{ padding:50 }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:20 }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <h4 style={{ marginLeft:10 }}> Loding Details ...</h4>
                </div>
            </Col>
        );
    }

    if (!produktData) {
        return (
            <Col md={8}>
                <div style={{ padding: 100, borderRadius: 20, marginTop: 20, textAlign: 'center' }}>
                    <img src="empty.png" style={{ marginBottom: 20, borderRadius: 20 }} />
                    <h2 style={{ color: 'gray' }}>Please select a product item</h2>
                </div>
            </Col>
        );
    }

    return (
        <Col md={8} mt="2">
            <h4>
                <strong>Details</strong>
            </h4>
            <hr />
            <Row>
                <Col md={6} xs={6}>
                    <Card style={{ border: "none" }}>

                        <Card.Img variant="top" src='empty.png' />
                    </Card>
                </Col>
                <Col md={6} xs={6}>
                    <Card  style={{ border: "none" }}>
                        <Card.Header>
                            <Card.Title>{produktData.idShort}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {submodelElement.map((submodel)=>//hier display submodels
                                    <ListGroup.Item  id={submodel.id} className="fw-bold">
                                        <Button variant="light">{submodel.idShort}</Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Button href={`${produktData.id}`} variant="info">
                    Show Link Product
                </Button>
            </Row>
        </Col>
    );
};

export default DetailsProdukt;
