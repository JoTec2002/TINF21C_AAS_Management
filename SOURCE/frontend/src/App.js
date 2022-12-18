import { Component } from 'react';
import { Col, Row,Container } from "react-bootstrap";
import { Mydocs, ListKategorie, NavComponent,Products } from "./components";
import { API_URL } from "./utils/constanst";
import axios from "axios";
import swal from "sweetalert";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            chooseCategory: "1.Kategorie",
            chooseDocs:[]
        }
    }

    componentDidMount() {
        axios
            .get(API_URL+"products?category.name="+this.state.chooseCategory)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
            .catch(error => {
                console.log(error);
            });
        axios
            .get(API_URL+"Myfiles")
            .then(res => {
                const chooseDocs = res.data;
                this.setState({ chooseDocs });
            })
            .catch(error => {
                console.log(error);
            });
        this.getListDocs();
    }
/*componentDidUpdate( prevState) {
        if(this.state.chooseDocs !== prevState.chooseDocs){
            axios
                .get(API_URL+"keranjangs")
                .then(res => {
                    const chooseDocs = res.data;
                    this.setState({ chooseDocs });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

*/
    getListDocs = () =>{
        axios
            .get(API_URL+"Myfiles")
            .then(res => {
                const chooseDocs = res.data;
                this.setState({ chooseDocs });
            })
            .catch(error => {
                console.log(error);
            });
    }

    changeCategory = (value) => {
        this.setState({
            chooseCategory: value,
            menus: []
        })
        axios
            .get(API_URL+"products?category.name="+value)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
            .catch(error => {
                console.log(error);
            })
        }
      docs =(value)=>{
          axios
              .get(API_URL+"Myfiles?product.id="+value.id)
              .then(res => {
                  if(res.data.length === 0){
                      const choosedoc={
                          klicks:1,
                          doc:value.doc,
                          product: value
                      };
                      axios
                          .post(API_URL+"Myfiles",choosedoc)
                          .then(res => {
                              this.getListDocs();
                             swal({
                                 title:"Document Chossen",
                                 text:"Document in your Folder",
                                 icon:"success",
                                 button:false,
                                 timer:600
                             });
                          })
                          .catch(error => {
                              console.log(error);
                          });
                  }else{
                      const choosedoc={
                          klicks:res.data[0].klicks+1,
                          doc:value.doc,
                          product: value
                      };
                      axios
                          .put(API_URL+"Myfiles/"+res.data[0].id,choosedoc)
                          .then(res => {
                              swal({
                                  title:"Document Chossen",
                                  text:"Document in your Folder"+choosedoc.product.nama,
                                  icon:"success",
                                  button:false,
                                  timer:600
                              });
                          })
                          .catch(error => {
                              console.log(error);
                          });

                  }
              })
              .catch(error => {
                  console.log(error);
              });
      };
    render() {
        const { products, chooseCategory, chooseDocs } =this.state
        return (
            <div className="App">
                <NavComponent/>
                <div className="mt-2">
                    <Container fluid>
                        <Row>
                            <ListKategorie changeCategory={this.changeCategory} chooseCategory={chooseCategory}
                           />
                            <Col>
                                <h4><strong>Produkte</strong></h4>
                                <hr/>
                                <Row>
                                    { products && products.map((product) => (
                                        <Products
                                            key={product.id}
                                            product={product}
                                           docs={this.docs}
                                        />
                                        ))}
                                </Row>
                            </Col>
                            <Mydocs chooseDocs={chooseDocs} getListDocs={this.getListDocs}/>
                        </Row>
                    </Container>
                </div>
            </div>
        )

    }
}




