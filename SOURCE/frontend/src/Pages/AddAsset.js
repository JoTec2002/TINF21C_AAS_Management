import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Form, Button, Col, Row, Container} from "react-bootstrap";
import {errorHandling} from "../components/errorHandling";

const AddAsset =()=>{
    return(
        <div>
            <NavComponent />
            {errorHandling()}
            <div style={{ paddingTop:20, paddingBottom:100 }}>
                <Container fluid>
                    <p>add Asset</p>
                </Container>
            </div>
        </div>
    )
}
export default AddAsset