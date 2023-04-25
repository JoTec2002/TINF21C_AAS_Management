import { NavComponent } from "../components";
import { Container, Row } from "react-bootstrap";
//import SidebarAdmin from "../components/SidebarAdmin";
import Dashboard from "../components/Dashboard";
import ErrorHandling from "../components/errorHandling";

const AdminDashboard = () => {
  return (
    <div>
      <NavComponent />
        <div id={"error"} />
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