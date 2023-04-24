import { AssetDetails, Mydocs, NavComponent, Assets } from "../components";
import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <NavComponent />
      <div className="mt2">
        <Container>
          <Row>
            <Assets />
            <AssetDetails />
            <Mydocs />
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default Home;
