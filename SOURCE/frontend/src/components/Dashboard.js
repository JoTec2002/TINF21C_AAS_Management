import React, { Component } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Button, Col, Form, Table } from "react-bootstrap";
import PopUpDelete from "./PopUpDelete";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state={
      shells: [],
      loading: true,
      searchTerm: "",
    }
  }

  onSearchTermChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  }

  componentDidMount() {
    axios.get("https://admin@example.com:admin@nas.graubner-bayern.de:50001/submodels/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vMzM4MV80MTYwXzQwMzJfMzc1Mw/submodelelements/roleMapping")
        .then(res => {
          console.log("Response : ", res);
          const shells = res.data;
          this.setState({ shells, loading: false });
        })
        .catch(error=>{
          console.log(error);
        })
  }

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
    const { shells, loading = true, searchTerm } = this.state;

    const filteredShells = shells.filter((shell) =>
        shell.idShort.toLowerCase().includes(searchTerm.toLowerCase()) // vllt auch: shell.value[i].idShort.k.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (



      <Col md={10} mt="2">
        <h4>
          <strong>Dashboard</strong>
        </h4>
        <hr />
        <Form className="d-flex">
          <Form.Control
              type="search"
              placeholder="Search Member ..."
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={this.onSearchTermChange}
          />
          <Button variant="outline-success">Search</Button>
        </Form>


        {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:20 }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <h4 style={{ marginLeft:10 }}>Loading ...</h4>
            </div>
        ) : (
            <div>
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
              {filteredShells && filteredShells.map((shells) => (
                  <tr>

                    <td>{`${shells.idShort}`}</td>
                    <td>Inactive</td>
                    <td>{`${shells.idShort}`}</td>
                    <td>
                      <Button href="#/create" variant="text btn-sm">
                        <BsPencilSquare />
                      </Button>
                      <Button variant="text btn-sm" onClick={() => this.handelShow()}>
                        <BsTrash />
                      </Button>
                    </td>


                  <div className={`produkt ${shells.idShort === this.state.activeProdukt ? "active" : ""}`}
                       onClick={() => this.chooseProdukt(shells.idShort)}>
                  </div>
                  </tr>
              ))}
          </tbody>
          </Table>
          <Button href="#/create" variant="outline-primary btn-sm">
          Create Account
          </Button>
          <PopUpDelete handleClose={this.handleClose} {...this.state} />
          </div>
        )
        }

      {/*  <Button href="#/create" variant="outline-primary btn-sm">*/}
      {/*    Create Account*/}
      {/*  </Button>*/}
      {/*  <PopUpDelete handleClose={this.handleClose} {...this.state} />*/}
      {/*</Col>*/}


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
                <Button href="#/create" variant="text btn-sm">
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
                <Button href="#/create" variant="text btn-sm">
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
                <Button href="#/create" variant="text btn-sm">
                  <BsPencilSquare />
                </Button>
                <Button variant="text btn-sm" onClick={() => this.handelShow()}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Button href="#/create" variant="outline-primary btn-sm">
          Create Account
        </Button>
        <PopUpDelete handleClose={this.handleClose} {...this.state} />
      </Col>
    );
  }
}
