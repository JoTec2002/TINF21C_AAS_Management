import React, { Component } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Button, Col, Form, Table } from "react-bootstrap";
import PopUpDelete from "./PopUpDelete";

export default class Dashboard extends Component {
  handelShow = () => {
    this.setState({
      showModal: true,
    });
  };
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    //const{ chooseDocs } =this.props
    return (
      <Col md={10} mt="2">
        <h4>
          <strong>Dashboard</strong>
        </h4>
        <hr />
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Filter Members"
            className="me-2"
            aria-label="Search"
            id="searchBarForProducts"
          />
          <Button variant="outline-success">Suche</Button>
        </Form>
        <Table striped>
          <thead>
            <tr>
              <th>Account</th>
              <th>State</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>paul.burner</td>
              <td>Active</td>
              <td>Basic</td>
              <td>
                <Button href="/create" variant="text btn-sm">
                  <BsPencilSquare />
                </Button>
                <Button variant="text btn-sm" onClick={() => this.handelShow()}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
            <tr>
              <td>JoGa112</td>
              <td>Active</td>
              <td>Admin</td>
              <td>
                <Button href="/create" variant="text btn-sm">
                  <BsPencilSquare />
                </Button>
                <Button variant="text btn-sm" onClick={() => this.handelShow()}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
            <tr>
              <td>DarthVader</td>
              <td>Inactive</td>
              <td>Advanced</td>
              <td>
                <Button href="/create" variant="text btn-sm">
                  <BsPencilSquare />
                </Button>
                <Button variant="text btn-sm" onClick={() => this.handelShow()}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button href="/create" variant="outline-primary btn-sm">
          Create Account
        </Button>
        <PopUpDelete handleClose={this.handleClose} {...this.state} />
      </Col>
    );
  }
}
