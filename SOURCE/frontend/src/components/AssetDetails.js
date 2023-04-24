import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Row, Button, ListGroup,DropdownButton } from "react-bootstrap";
import Collapsible from 'react-collapsible';
import { API_URL } from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import base64url from "base64url";

const AssetDetails = ({ data }) => {
    const [produktData, setProduktData] = useState(null);
    const [submodelContent, setSubmodelContent]= useState([]);
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
                setSubmodelContent(submodelElement => [...submodelElement, res.data]);
            })
            .catch((error) =>{
                console.error(error);
            })
            .finally(()=>{
                setLoading(false);
            })
    }

    const getSubmodelContent = (id, path) => {
        //setLoading(true);

        //setLoading(false);
    };

    const returnSubmodelContent = (submodelContent) => {
        return "hallo";
    }

    useEffect(() => {
        setLoading(true); // نمایش صفحه لودینگ
        //reset details
        setProduktData(null);
        setSubmodelContent([]);
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
                console.log(submodelContent);

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
                    <h2 style={{ color: 'gray' }}>Please select an Asset</h2>
                </div>
            </Col>
        );
    }

    return (
        <Col md={8} mt="2">
            <h4>
                <strong>Submodels</strong>
            </h4>
            <hr />
                    <Card  style={{ border: "none" }}>
                        <Card.Header>
                            <Card.Title>{produktData.idShort}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                                {submodelContent.map((submodel)=>//hier display submodels
                                    <Collapsible  id={submodel.id} className="fw-bold" trigger={submodel.idShort} onOpening={getSubmodelContent(submodel.id, submodel.idShort)}>
                                        {console.log(submodel)}
                                        <p><strong>Semantic ID: </strong>{submodel.semanticId.keys[0].value}</p>

                                        {console.log(submodel.submodelElements)}
                                        {returnSubmodelContent(submodel.submodelElements)}
                                        {
                                            submodel.submodelElements.map((submodelElement) =>
                                                submodelElement.modelType === "Property"
                                                    ?<p><strong>{submodelElement.idShort}: </strong>{submodelElement.value}</p>
                                                    : null


                                                //<p>123</p>
                                            )
                                        }
                                        <p>Test 123</p>
                                    </Collapsible>
                                )}
                        </Card.Body>
                    </Card>
                <Button href={`${produktData.id}`} variant="info">
                    Show Link Product
                </Button>
        </Col>
    );
};

export default AssetDetails;
