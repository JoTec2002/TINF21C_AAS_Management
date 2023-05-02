import React, { useState } from 'react';
import { AssetDetails, Mydocs, NavComponent, Assets } from '../components';
import { Col, Row, Container } from 'react-bootstrap';
import {errorHandling} from "../components/errorHandling";

function Guest() {
  const [selectedData, setSelectedData] = useState();

  return (
    <div >

      <NavComponent />
        <div style={{marginLeft:"2rem", marginRight:"2rems"}}>
      {errorHandling()}


          <Container fluid >
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
