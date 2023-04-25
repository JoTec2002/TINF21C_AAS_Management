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
