import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Form, Button, Col, Row, Container} from "react-bootstrap";
import {errorHandling, setErrorHandling} from "../components/errorHandling";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../utils/constanst";

const AddAsset =()=>{
    const [selectedFile, setSelectedFile] = useState();
    const [selectedAasId, setselectedAasId] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    const changeHandlerFile = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
        setIsSelected(true);
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
            axios.post(`${API_URL}packages`,bodyFormData,{
                auth:{
                    username:localStorage.getItem("email"),
                    password:localStorage.getItem("password")
                }}
            ).then((res)=>{
                console.log(res);
            })
            .catch((error) =>{
                setErrorHandling(error);
            })
        }else {
            alert("please fill out the form completly")
        }
    };

    return(
        <div>
            <NavComponent />
            {errorHandling()}
            <div style={{ paddingTop:20, paddingBottom:100 }}>
                <Container fluid className={"mx-auto"}>
                    <Row>
                        <input type={"text"} name={"aasid"} onChange={changeHandlerAasId}/>
                        <input type="file" name="file" onChange={changeHandlerFile} accept={".aasx"} />
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
                        <p>Select a file to show details</p>
                    )}
                    <div>
                        <button onClick={handleSubmission}>Submit</button>
                    </div>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default AddAsset