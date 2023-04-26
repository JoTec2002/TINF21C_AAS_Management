import React, { useState } from 'react';
import { AssetDetails, Mydocs, NavComponent, Assets } from '../components';
import { Col, Row, Container } from 'react-bootstrap';
import errorHandling from "../components/errorHandling";

function Guest() {
  const [selectedData, setSelectedData] = useState();

  return (
    <div>
      <NavComponent />
      <div id={"error"} />{errorHandling("loading")}
      <div style={{ paddingTop:20, paddingBottom:100 }}>
        <Container>
          <Row>
            <Assets onSelect={setSelectedData} />
            <AssetDetails data={selectedData} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Guest;
