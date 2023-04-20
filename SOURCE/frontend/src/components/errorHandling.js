import React, {Component, useState} from "react";
import { Button, Col, Form, Table } from "react-bootstrap";

export default class errorHandling extends Component{
    constructor(props) {
        super(props)
        this.state={
            globalerror: '',
        }
    }

    render() {
        return(
            <Col>{this.state.globalerror &&
                <Col>{this.state.globalerror}</Col>}</Col>
        )
    }


}