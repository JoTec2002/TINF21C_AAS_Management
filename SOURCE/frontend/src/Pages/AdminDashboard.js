import { NavComponent } from "../components";
import { Container, Row } from "react-bootstrap";
import SidebarAdmin from "../components/SidebarAdmin";
import Dashboard from "../components/Dashboard";

const AdminDashboard = () => {
  return (
    <div>
      <NavComponent />
      <div className="mt2">
        <Container fluid>
          <Row>
            <SidebarAdmin />
            <Dashboard />
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default AdminDashboard;
