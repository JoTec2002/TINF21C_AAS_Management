import React, { useState } from 'react';
import { DetailsProdukt, Mydocs, NavComponent, Produkte } from '../components';
import { Col, Row, Container } from 'react-bootstrap';

function Guest() {
  const [selectedData, setSelectedData] = useState();

  return (
    <div>
      <NavComponent />
      <div style={{ paddingTop:20, paddingBottom:100 }}>
        <Container>
          <Row>
            <Produkte onSelect={setSelectedData} />
            <DetailsProdukt data={selectedData} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Guest;
