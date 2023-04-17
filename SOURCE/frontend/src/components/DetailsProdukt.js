import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Row, Button, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import { base64url } from "base64url";

const DetailsProdukt = ({ data }) => {
  const [produktData, setProduktData] = useState(null);
  const [loading, setLoading] = useState(false);
  const base64url = require('base64url');

  useEffect(() => {
    setLoading(true); // نمایش صفحه لودینگ
    axios
      .get(`${API_URL}shells?idShort=${data}`)
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
  produktData && produktData.map((shells) => (

      // soll hier eine Iteration umzu suche welche submodelsID(produktData[0].submodels[3].keys[0].value)gultig ist

      produktData[0].idEncoded= base64url.fromBase64(window.btoa(produktData[0].submodels[3].keys[0].value))
  ))
  // für Bild GeneralInformation.ProductImage01=idShortPath, darf nicht hartcoded


  return (
    <Col md={8} mt="2">
      <h4>
        <strong>Details Produkt</strong>
      </h4>
      <hr />
      <Row>
        <Col md={6} xs={6}>
          <Card style={{ border: "none" }}>

            <Card.Img variant="top" src={API_URL+'submodels/'+produktData[0].idEncoded+'/submodelelements/GeneralInformation.ProductImage01/attachment'} />
          </Card>
        </Col>
        <Col md={6} xs={6}>
          <Card style={{ border: "none" }}>
            <Card.Header>
              <Card.Title>{produktData[0].idShort}</Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="fw-bold">
                  submodels
                  <Card.Text className="fw-normal">{produktData[0].submodels[0].type}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item className="fw-bold">
                  modelType
                  <Card.Text className="fw-normal">{produktData[0].modelType}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item className="fw-bold">
                  assetKind:
                  <Card.Text className="fw-normal">{produktData[0].assetInformation.assetKind}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item className="fw-bold">
                  Id or Link:
                  <Card.Text className="fw-normal">{produktData[0].id}</Card.Text>
                </ListGroup.Item>
                <ListGroup.Item className="fw-bold">
                  IdEncoded:
                  <Card.Text className="fw-normal">{produktData[0].idEncoded}</Card.Text>
                </ListGroup.Item>
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
