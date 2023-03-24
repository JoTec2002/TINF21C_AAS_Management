import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Form, Button, Col,Row} from "react-bootstrap";
import { FiCamera } from "react-icons/fi"

const AddUser =()=>{
    return(
        <div>
            <NavComponent />
            <div className="newprodukt">

                <div className="box">
                    <FiCamera style={{fontSize: "25rem"}}/>
                </div>

                <div className="box">
                    <Form>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="email"/>
                        <Form.Label>Vorname</Form.Label>
                        <Form.Control type="email"/>
                        <Form.Label>username</Form.Label>
                        <Form.Control type="email"/>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"/>
                        <Button href="admin" variant="success" type="submit"
                                style={{marginTop: "20px", marginLeft: "10px"}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>

        </div>
)
}
export default AddUser