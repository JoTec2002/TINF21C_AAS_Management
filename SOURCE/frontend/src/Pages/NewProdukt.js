import {DetailsProdukt, Mydocs, NavComponent, Produkte} from "../components";
import {Form, Button, Col,Row} from "react-bootstrap";
import { FiCamera } from "react-icons/fi"

const NewProdukt =()=>{
    return(
        <div>
            <NavComponent/ >
            <div class="newprodukt">

                    <div class="box">
                        <FiCamera style={ {fontSize:"25rem"}}/>
                    </div>

               <div class="box">
                <Form>
                        <Form.Label >Herstellername</Form.Label>
                        <Form.Control type="email"  />
                        <Form.Label >Herstellerproduktbezeihung</Form.Label>
                        <Form.Control type="email"  />
                        <Form.Label >Abteilung</Form.Label>
                        <Form.Control  type="email"  />
                        <Form.Label >Adresse</Form.Label>
                        <Form.Control  type="password"  />
                        <Button href="home" variant="success" type="submit" style={{marginTop:"20px", marginLeft:"10px"}}>
                        Submit
                        </Button>
                </Form>
               </div>
            </div>

        </div>
    )
}
export default NewProdukt