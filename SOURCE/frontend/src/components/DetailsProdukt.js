import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Row, Button, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import { base64url } from "base64url";
import PopUpLogin from "./PopUpLogin";

const DetailsProdukt = ({ data }) => {
    const [produktData, setProduktData] = useState(null);
    const [submodelsData, setSubmodelsData] = useState([]);
    const [submodElement, setSubmodElement]= useState([])

    const [loading, setLoading] = useState(false);
    const base64url = require('base64url');

    useEffect(() => {
        setLoading(true); // نمایش صفحه لودینگ
        axios
            .get(`${API_URL}shells?idShort=${data}`, {
                auth: {
                    username: PopUpLogin.username,
                    password: PopUpLogin.password
                }})
            .then((res) => {
                setProduktData(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); // مخفی کردن صفحه لودینگ
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
    //Encdded SubmodelsID

    for(let i=0;i<produktData.length;i++){
        for(let j=0;j<produktData[0].submodels.length;j++) {
            produktData[0].submodels[j].keys[0].value=base64url.fromBase64(window.btoa(produktData[0].submodels[j].keys[0].value))

        }
    }
//submodels/{sudmodelsIdentifier}
    produktData[0].submodels.map((submodels)=>
        axios.get(API_URL+"submodels/"+submodels.keys[0].value, {
            auth: {
                username: PopUpLogin.username,
                password: PopUpLogin.password
            }})
            .then(res => {
                console.log("Response submodels: ", res.data);
                const someData = res.data.idShort;
                if (!submodelsData.includes(someData)) {
                    setSubmodelsData(prevSubmodelsData => [...prevSubmodelsData, someData]);
                }

            })
            .catch(error=>{
                console.log(error);
            })
    )
    produktData[0].submodels.map((submodels,index)=>
        axios.get(API_URL+"submodels/"+submodels.keys[0].value+"/submodelelements", {
            auth: {
                username: PopUpLogin.username,
                password: PopUpLogin.password
            }})
            .then(res => {
                console.log("Response elements: ", res.data);
                console.log("Response elements1: ", res.data[index].idShort);
                const element = res.data[index].idShort;
                if (!submodElement.includes(element)) {
                    setSubmodElement(prevSubmodElement => [...prevSubmodElement, element]);
                }


            })
            .catch(error=>{
                console.log(error);
            })
    )
    return (

        <Col md={8} mt="2">
            <h4>
                <strong>Details Produkt</strong>
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

                            <Card.Title>{produktData[0].idShort}</Card.Title>
                        </Card.Header>
                        <Card.Body>

                            <ListGroup variant="flush">
                                {submodElement.map((elements,index)=>
                                    <ListGroup.Item  className="fw-bold">
                                        {elements}
                                        <Card.Text className="fw-normal"></Card.Text>
                                    </ListGroup.Item>
                                )}

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Button href={`${produktData[0].id}`} variant="info">
                    Show Link Product
                </Button>
            </Row>
        </Col>
    );
};

export default DetailsProdukt;
