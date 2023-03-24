import React, { Component } from "react";
import { Col, ListGroup, Form, Button } from "react-bootstrap";

import { FiSearch } from "react-icons/fi";
import { getElement } from "bootstrap/js/src/util";

import axios from "axios";
import { API_URL } from "../utils/constanst";

export default class Produkte extends Component {
    constructor(props) {
        super(props)
        this.state={
            shells: [],
            choose: false

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
    }
      chooseProdukt=()=>{
          this.setState({
              choose:true


          })
      }
    render() {
        const { shells }=this.state
        return (
            <Col md={4} mt="2">

  render() {
    //const { shells }=this.state

    // const [selectIndex, setSelectedIndex] = useState(-1);
    let products = ["Produkt1", "Produkt2"];

    // const handleSearch = () => {
    //   for (const product of products) {
    //     if (
    //       !product.includes(document.getElementById("searchBarForProducts"))
    //     ) {
    //       document.getElementById(product).style.display = "none";
    //     }
    //   }
    // };

                <div >
                    {shells && shells.map((shells) => (

                        <div class="produkt" onClick={()=>this.chooseProdukt()}><h6>{shells.idShort}</h6></div>

                        ))}
                </div>
            </Col>
        )

        {/*<ul className="list-group">
          {products.map((products, index) => (
            <li
              className={
                selectIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={products}
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              {products}
            </li>
          ))}
        </ul>*/}

        <ListGroup>
          {products.map((products) => (
            <ListGroup.Item key={products}>{products}</ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
