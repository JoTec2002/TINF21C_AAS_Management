import { NavComponent } from "../components";
import { Container, Row } from "react-bootstrap";
import Dashboard from "../components/Dashboard";
import {errorHandling} from "../components/errorHandling";

const AdminDashboard = () => {
  return (
    <div>
      <NavComponent />
        {errorHandling()}
      <div className="mt2" style={{ paddingTop:20, paddingBottom:100 }}>
          <Container fluid>
          <Row>
            <Dashboard />
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default AdminDashboard;