import React, {Component} from 'react';
import { Col, ListGroup  } from "react-bootstrap";
/*import axios from "axios";
import { API_URL } from "../utils/constanst";*/




export default class Produkte extends Component {
    /*constructor(props) {
       super(props)
       this.state={
           shells: []
       }
   }
  componentDidMount() {
     axios.get(API_URL+"shells")
          .then(res => {
              //Json datein, losche später!
              console.log("Response : ", res);
              const shells = res.data;
              this.setState({ shells });
          })
          .catch(error=>{
              console.log(error);
          })
           // {shells && shells.map((shells) => (

                      <ListGroup.Item>{shells.idShort}</ListGroup.Item>

                  ))}
    }*/
    render() {
        //const { shells }=this.state
        return (
            <Col md={4} mt="2">
                <h4>
                    <strong></strong>
                    <strong>Produkte</strong>
                </h4>
                <hr/>
                <ListGroup>
                        <ListGroup.Item>Produkt1</ListGroup.Item>
                </ListGroup>
            </Col>
        )

    }

}