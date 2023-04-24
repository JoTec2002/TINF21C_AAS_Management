import { Component } from 'react';
import { Col, Row,Container } from "react-bootstrap";
import { Mydocs, ListKategorie, NavComponent,DetailsProdukt } from "./components";
import { API_URL } from "./utils/constanst";
import axios from "axios";
import swal from "sweetalert";
import Guest from "./Pages/Guest";
import RouterPages from "./utils/RouterPages";


export default class App extends Component {
    render(){
        return(
            <RouterPages/>
        )
    }
}
/*
* constructor(props) {
        super(props)
        this.state={
            shells: [],
            choose: 'REGISTRY'
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

        changeProduct= (value) =>{
            this.setState({
                    choose: value,
                    shells: []
            })
            axios.get(API_URL+"shells?idShort="+value)
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

render(){
    const { shells,choose }=this.state
    return(
        <div className="App">
            <NavComponent />
            <div className="mt2">
                <Container fluid>
                    <Row>

                        <Col md={4} mt="2">
                            <h4><strong>Assets</strong></h4>

                            <Row>
                                {shells && shells.map((shells) => (
                                    <Assets changeProduct={this.changeProduct} choose={choose}
                                                   shells={shells}
                                    />

                                ))}
                            </Row>
                        </Col>

                        <Col md={6} mt="2">
                            <h4><strong>Deteils Produkt</strong></h4>
                            <hr />
                            <Row>
                                {shells && shells.map((shells) => (
                                    <AssetDetails
                                        shells={shells}
                                    />

                                ))}
                            </Row>
                        </Col>
                        <Mydocs />
                    </Row>
                </Container>
            </div>
        </div>

    );
}*/

