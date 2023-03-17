import React, {Component} from 'react';
import { Col, ListGroup ,Row } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constanst";




const ListKategorie =({shells}) => {

    return (
        <div>
            <ListGroup>
                <ListGroup.Item >{shells.idShort}</ListGroup.Item>
            </ListGroup>
        </div>
    )

}

export default ListKategorie