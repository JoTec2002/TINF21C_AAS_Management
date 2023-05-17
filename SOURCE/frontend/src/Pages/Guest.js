import React, { useState } from 'react';
import { AssetDetails, NavComponent, Assets } from '../components';
import { Row, Container } from 'react-bootstrap';
import {errorHandling} from "../components/errorHandling";

function Guest() {
  const [selectedData, setSelectedData] = useState();

  return (
    <div >

      <NavComponent />
        {errorHandling()}
      <div className="mt2" style={{ paddingTop:17}}>

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
