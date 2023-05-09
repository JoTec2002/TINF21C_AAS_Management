import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Form, Button, Col, Row, Container} from "react-bootstrap";
import {errorHandling, setErrorHandling} from "../components/errorHandling";
import React, {useState} from "react";
import axios from "axios";
import {API_URL} from "../utils/constanst";
import {Link} from "react-router-dom";

const AddAsset =()=>{
    const [selectedFile, setSelectedFile] = useState();
    const [selectedAasId, setselectedAasId] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAssetButton, setShowAssetButton] = useState(false);

    const setUploaded = () => {
        setIsSubmitted(true);
        setShowAssetButton(true);
    }

    const changeHandlerFile = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
        setIsSelected(true);

        const fileSize = event.target.files[0].size / 1024 / 1024; // in MiB
        if (fileSize > 28.6) {
            alert("File size exceeded! File has to be replaced for successful upload!")
        }

    };
    const changeHandlerAasId = (event) => {
        setselectedAasId(event.target.value)
    };

    const handleSubmission = () => {
        if(selectedAasId !== "" && isSelected){
            var bodyFormData = new FormData();
            bodyFormData.append("aasIds", selectedAasId);
            bodyFormData.append("file", selectedFile)
            bodyFormData.append("fileName", selectedFile.name)
            axios.post(`${API_URL}packages`, bodyFormData, {
                auth: {
                    username: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                }
            }
                ).then((res) => {
                    console.log(res);
                    if (res.status === 201) {
                        alert("File added successfully.")
                    }
                })
                    .catch((error) => {
                        setErrorHandling(error);
                    })

        }else {
            alert("please fill out the form completely")
        }
    };

    return(
        <div>
            <NavComponent />

            {errorHandling()}
            <div style={{ paddingTop:20, paddingBottom:100 }}>
                <Container fluid="md">
                    <Row>
                        <label className="form-label" htmlFor="aasid_input"><strong>Please specify the AAS-ID</strong></label>
                        <input type={"text"} class="form-control" name={"aasid"} onChange={changeHandlerAasId}/>
                        <hr/>
                        <input type="file" className="form-control" name="file" onChange={changeHandlerFile} accept={".aasx"} />
                    {isSelected ? (
                        <div>
                            <p>Filename: {selectedFile.name}</p>
                            <p>Size in bytes: {selectedFile.size}</p>
                            <p>
                                lastModifiedDate:{' '}
                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <div>
                        <hr/>
                        <div className="alert alert-warning" role="alert">Please select a file to show the details!</div>
                        </div>
                    )}
                    <div>
                        {!isSubmitted &&
                            <input className="btn btn-primary" type="submit" value="Submit" onClick={setUploaded}/>
                        }
                        {showAssetButton &&
                            <Link to="/">
                            <button className="btn btn-primary">Show Asset</button>
                            </Link> }
                    </div>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default AddAsset