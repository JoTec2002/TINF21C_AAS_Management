import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Form, Button, Modal, Row, Container} from "react-bootstrap";
import {errorHandling, setErrorHandling} from "../components/errorHandling";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../utils/constanst";
import base64url from "base64url";
import {useNavigate} from 'react-router-dom'

const AddAsset =()=>{
    const [packageId, setpackageId] = useState(-1);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    function getPackageIdFromAasId(aasId){
        axios.get(`${API_URL}packages`, {
                auth: {
                    username: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                }
            })
            .then(async (res) => {
                for(let i=0; i<res.data.length; i++){
                    if(res.data[i].aasIds[0] === aasId){
                        setpackageId(res.data[i].packageId);
                    }
                }

            })
            .catch((error) => {
                setErrorHandling(error);
            })
    }

    const query = useSearchParams();
    const aasId = query[0].get("aasId");
    getPackageIdFromAasId(aasId);

    function handleSubmission(){
        if(aasId !== null && packageId !== -1){
            let b64packageId = base64url.fromBase64(window.btoa(packageId));
            axios.delete(`${API_URL}packages/${b64packageId}`, {
                auth: {
                    username: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                }
            })
                .then(async (res) => {
                    console.log(res);
                    if(res.status === 204){
                        alert("File deleted successfully");
                    }
                })
                .catch((error) => {
                    setErrorHandling(error);
                })
        }else {
            alert("No AAS ID given or no package found for given AAS ID");
        }
    }

    return(
        <div>
            <NavComponent />
            {errorHandling()}

                <Container fluid className={"mx-auto"}>
                    <Row>
                        {packageId?(
                            <div
                                className="modal show"
                                style={{ display: 'block', position: 'initial' }}
                                 >
                                <Modal.Dialog>
                                    <Modal.Header >
                                        <Modal.Title>Are You sure you wan't to delete this Asset?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p key={"AssetID"}><strong>Asset Id: </strong>{aasId}</p>
                                        <p key={"PackageID"}><strong>Package Id:</strong> {packageId}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={goBack}>cancel</Button>
                                        <Button onClick={handleSubmission} variant="danger">DELETE</Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </div>
                        ):(<a></a>)}
                    </Row>
                </Container>
        </div>
    )
}
export default AddAsset