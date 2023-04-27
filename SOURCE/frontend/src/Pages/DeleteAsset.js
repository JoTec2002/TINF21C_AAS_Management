import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Form, Button, Col, Row, Container} from "react-bootstrap";
import {errorHandling, setErrorHandling} from "../components/errorHandling";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../utils/constanst";
import base64url from "base64url";

const AddAsset =()=>{
    const [packageId, setpackageId] = useState(-1);
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
            <div style={{ paddingTop:20, paddingBottom:100 }}>
                <Container fluid className={"mx-auto"}>
                    <Row>
                        {packageId?(
                            <div>
                                <p>Are You sure you wan't to delete this Asset?</p>
                                <p key={"AssetID"}>Asset Id: {aasId}</p>
                                <p key={"PackageID"}>Package Id: {packageId}</p>
                                <button onClick={handleSubmission}>DELETE</button>
                            </div>
                        ):(<a></a>)}
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default AddAsset