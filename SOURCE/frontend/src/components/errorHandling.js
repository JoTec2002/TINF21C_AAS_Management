import { Button, Col, Form, Table } from "react-bootstrap";

const errorHandling = ({ error }) => {
    console.log(error);
    if(error !== undefined){
        console.log("im here");
        return (
            <Col>
                {error}
            </Col>
        );
    }
};
export default errorHandling;