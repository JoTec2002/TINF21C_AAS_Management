import React from "react";
import { Col } from "react-bootstrap";

const ErrorHandling = (props) => {
const { errorLog } = props;
console.log(errorLog)
  return (
    <Col md={12}>
        <h3 style={{ padding:20, color:"gray" }}>{errorLog}</h3>
    </Col>
  );
};

export default ErrorHandling;
