import React, {useState, useEffect} from "react";
import axios from "axios";
import {Col, Button, Row} from "react-bootstrap";
import Collapsible from 'react-collapsible';
import {API_URL} from "../utils/constanst";
import Spinner from 'react-bootstrap/Spinner';
import base64url from "base64url";
import {setErrorHandling} from "./errorHandling";
import {getCookie} from "./helpers";

const AssetDetails = ({data}) => {
    const [produktData, setProduktData] = useState(null);
    const [submodelContent, setSubmodelContent] = useState([]);
    const [loading, setLoading] = useState(false);


    const endcode = (id) => {
        let idchange = base64url.fromBase64(window.btoa(id));
        return idchange;
    }

    data = endcode(data);

    const getSubmodel = async (id) => {
        setLoading(true)
        try {
            let res =
                await axios.get(`${API_URL}shells/${data}/submodels/${id}/submodel`, {
                    auth: {
                        username: getCookie("user")?.email,
                        password: getCookie("user")?.password
                    }
                })
            return res.data;
        } catch (error) {
            setErrorHandling(error);
        }
    }
    const getFileContentBase64 = (id, path, contentType) => {
        axios.get(`${API_URL}submodels/${id}/submodelelements/${path}/attachment`, {
            auth: {
                username: getCookie("user")?.email,
                password: getCookie("user")?.password
            },
            responseType: 'blob'
        })
            .then((res) => {

                let reader = new FileReader();
                reader.readAsDataURL(res.data);
                reader.onloadend = function () {
                    let base64String = reader.result;
                    base64String = base64String.substring((base64String.indexOf(',') + 1))
                    document.getElementById(id + "-" + path).src = "data:" + contentType + ";base64," + base64String;
                }
            })
            .catch(async (error) => {
                let jsondata = JSON.parse(await error.response.data.text());
                error.response.data = jsondata;
                setErrorHandling(error);
            })
    };
    const getFileContentDownload = (id, path, contentType) => {
        console.log("RUN")
        axios.get(`${API_URL}submodels/${id}/submodelelements/${path}/attachment`, {
            auth: {
                username: getCookie("user")?.email,
                password: getCookie("user")?.password
            },
            responseType: 'blob'
        })
            .then((res) => {
                let reader = new FileReader();
                reader.readAsDataURL(res.data);
                reader.onloadend = function () {
                    let base64String = reader.result;
                    base64String = base64String.substring((base64String.indexOf(',') + 1))
                    let anchor = document.createElement("a")
                    anchor.setAttribute('download', '');
                    anchor.href = "data:" + contentType + ";base64," + base64String;
                    anchor.click();
                    anchor.remove();
                }
            })
            .catch(async (error) => {
                let jsondata = JSON.parse(await error.response.data.text());
                error.response.data = jsondata;
                setErrorHandling(error);
            })
    };
    const returnSubmodelContent = (submodelElement, submodelid, idShortPath) => {
        if (idShortPath.length === 0) {
            idShortPath = submodelElement.idShort
        } else {
            idShortPath = idShortPath + "." + submodelElement.idShort;
        }
        if (submodelElement.modelType === "Property") {
            return (<p key={submodelElement.idShort}><strong>{submodelElement.idShort}: </strong>{submodelElement.value}
            </p>)
        }
        if (submodelElement.modelType === "SubmodelElementCollection") {
            return (
                <Collapsible trigger={submodelElement.idShort}>
                    {submodelElement.semanticId?.keys.length !== 0 ?
                        (<p key={submodelElement.idShort}><strong>Semantic
                            ID: </strong>{submodelElement.semanticId?.keys[0].value}</p>) :
                        (<a></a>)
                    }
                    {
                        submodelElement.value.map((innerSubmodelElement) =>

                            returnSubmodelContent(innerSubmodelElement, submodelid, idShortPath)
                        )
                    }
                </Collapsible>)
        }
        if (submodelElement.modelType === "MultiLanguageProperty") {
            return (
                <div>
                    <p key={submodelElement.idShort}><strong>{submodelElement.idShort}:</strong><br/></p>
                    {submodelElement.value.langStrings.map((languageElement) => (
                        <p key={submodelElement.idShort + languageElement.language} className={"tab"}>
                            <strong>{languageElement.language}</strong> {languageElement.text}
                        </p>
                    ))}
                </div>)
        }
        if (submodelElement.modelType === "Entity") {
            return (
                <p key={submodelElement.idShort + "GlobalAssetId"}>
                    <strong>{submodelElement.entityType}: </strong>
                    <a href={submodelElement.globalAssetId?.keys[0].value}
                       target={"_blank"}>{submodelElement.globalAssetId?.keys[0].value}
                    </a>
                </p>
            )
        }
        if (submodelElement.modelType === "File") {
            if (submodelElement.contentType.startsWith("image/") || submodelElement.contentType === "application/png") {
                getFileContentBase64(submodelid, idShortPath, submodelElement.contentType);
                return (<p>{submodelElement.idShort}: <img id={submodelid + "-" + idShortPath}/></p>)
            }
            else {
                //Just make each other filetype downloadable
                return (<p>{submodelElement.idShort}: <a id={submodelid + "-" + idShortPath}
                                                         onClick={() => getFileContentDownload(submodelid, idShortPath, submodelElement.contentType)}>Download</a>
                </p>)
            }
        }

        return (<div className="alert alert-danger" role="alert">Error: submodelContent not
            implemented {submodelElement.modelType}</div>);
    }

    useEffect(() => {
        if (data !== "dW5kZWZpbmVk") {
            setLoading(true);
            //reset details
            setProduktData(null);
            setSubmodelContent([]);
            axios
                .get(`${API_URL}shells/${data}`, {
                    auth: {
                        username: getCookie("user")?.email,
                        password: getCookie("user")?.password
                    }
                })
                .then(async (res) => {
                    console.log(res.data)
                    setProduktData(res.data);
                    let submodels = [];
                    for (let i = 0; i < res.data.submodels.length; i++) {
                        try {        //try catch for not correct response
                            let submodelIdEncoded = endcode(res.data.submodels[i].keys[0].value);
                            let submodel = await getSubmodel(submodelIdEncoded)
                            if (submodel !== undefined) {
                                submodels.push(submodel);
                            }
                        } catch (e) {

                        }

                    }
                    setSubmodelContent(submodels);
                    console.log(submodels);

                })
                .catch((error) => {
                    setLoading(false);
                    setErrorHandling(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [data]);

    if (loading) {
        return (
            <Col md={8} style={{padding: 50}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20}}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <h4 style={{marginLeft: 10}}> Loading Details ...</h4>
                </div>
            </Col>
        );
    }

    if (!produktData) {
        return (
            <Col md={8}>
                <div style={{padding: 100, borderRadius: 20, marginTop: 20, textAlign: 'center'}}>
                    <img src="empty.png" style={{marginBottom: 20, borderRadius: 20}}/>
                    <h2 style={{color: 'gray'}}>Please select an Asset</h2>
                </div>
            </Col>
        );
    }

    return (
        <Col md={8} mt="2">
            <h4>
                <strong>Submodels</strong>
            </h4>
            <hr/>
            <div style={{height: "80vh"}}>
                <div className="card">
                    <div className="card-header">
                        <Row>
                            <Col>
                                <h4>{produktData.idShort}</h4>
                            </Col>
                            <Col>
                                {getCookie("user")?.email ? (
                                    <Button style={{float: "right"}} href={'#/deleteAsset?aasId=' + produktData.id}
                                            variant="danger">
                                        Delete Asset
                                    </Button>
                                ) : (<a></a>)}
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginTop: '0.5rem'}}>
                        {submodelContent.map((submodel) =>//hier display submodels
                            <Collapsible key={submodel.id} trigger={submodel.idShort}
                                         open={submodel.idShort === "Nameplate"}>
                                {console.log(submodel)}
                                {submodel.semanticId.keys.length !== 0 ?
                                    (<p key={submodel.semanticId.keys[0].value}><strong>Semantic
                                        ID: </strong>{submodel.semanticId.keys[0].value}</p>) :
                                    (<a></a>)
                                }
                                {
                                    submodel.submodelElements.map((submodelElement) =>
                                        returnSubmodelContent(submodelElement, endcode(submodel.id), "")
                                    )
                                }
                            </Collapsible>
                        )}
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default AssetDetails;
