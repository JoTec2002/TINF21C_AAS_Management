import React, {Component} from 'react';
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constanst";




export default class ListKategorie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        axios
            .get(API_URL+"categories")
            .then(res => {
                const categories= res.data;
                this.setState({categories});
            })
            .catch(error => {
                console.log(error);
            } )
    }
    render() {
        const { categories } =this.state;
        const { changeCategory, chooseCategory }=this.props;
        console.log(this.props);
        return (
                <Col md={2} mt="2">
                    <h4><strong>Kategorie</strong></h4>
                    <hr />
                    <ListGroup>
                        {categories && categories.map((category) =>(
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => changeCategory(category.name)}
                                className={chooseCategory === category.name && "category-aktif"}
                                style={{cursor: 'pointer'}}
                            >
                                <h5>{category.name}</h5>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                );
    }
}

