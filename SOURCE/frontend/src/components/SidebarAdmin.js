import React, { Component } from "react";
// import { IconName } from "react-icons/bs";
import { Col, Nav } from "react-bootstrap";

export default class SidebarAdmin extends Component {
  render() {
    //const{ chooseDocs } =this.props
    return (
      <Col md={2} mt="2">
        <h4>
          <strong>Sidebar</strong>
        </h4>
        <hr />
        <Nav defaultActiveKey="/admin" className="flex-column">
          <Nav.Link href="/admin">Dashboard</Nav.Link>
          <Nav.Link eventKey="disabled" disabled>
            Another Option
          </Nav.Link>
        </Nav>
      </Col>
    );
  }
}
