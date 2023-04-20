import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Row, Button, ListGroup,DropdownButton } from "react-bootstrap";
import { API_URL } from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import { base64url } from "base64url";

const DetailsProdukt = ({ data }) => {
    const [produktData, setProduktData] = useState(null);
    const [submodElement, setSubmodElement]= useState([])
    const [idEncoded, setidEncoded]= useState([])
    const [loading, setLoading] = useState(false);

    const endcode=(id)=>{
        const base64url = require('base64url');
        const idchange = base64url.fromBase64(window.btoa(id));
        return idchange;
 }


    useEffect(() => {
        setLoading(true); // نمایش صفحه لودینگ
        //hier id wird geleert
        setidEncoded([]);
        //hier sollte sub models geleert sein
        setSubmodElement([])
        axios
            .get(`${API_URL}shells?idShort=${data}`,{
                auth:{
                    username:localStorage.getItem("email"),
                    password:localStorage.getItem("password")
                }
            })
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


    for (let j = 0; j < produktData[0].submodels.length; j++) {
        let id = endcode(produktData[0].submodels[j].keys[0].value);
        if (!idEncoded.includes(id)) {
            setidEncoded(previdEncoded => [...previdEncoded, id]);
        }
    }

/*hier noch fehlerhaft - ids anscheind in der schleife gefangen und hat sich wiederholt*/
        idEncoded.map((id)=>
        axios.get(API_URL+"submodels/"+id)
            .then(res => {
               console.log("Response elements: ", res.data);
                    const submod = res.data.idShort;
                    if (!submodElement.includes(submod)) {
                        setSubmodElement(prevSubmodElement => [...prevSubmodElement, submod]);
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
                                {submodElement.map((element)=>//hier display submodels
                                    <ListGroup.Item  className="fw-bold">
                                        <Button variant="light">{element}</Button>

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
