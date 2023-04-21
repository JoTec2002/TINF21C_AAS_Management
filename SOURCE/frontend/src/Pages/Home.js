import React , { useState } from 'react'
import { DetailsProdukt, Mydocs, NavComponent, Produkte } from "../components";
import { Container, Row } from "react-bootstrap";

const Home = () => {


  return (
    <div>
      <NavComponent />
      <div className="mt2">
        <Container>
          <Row>

            <Produkte />
            <DetailsProdukt />
            <Mydocs />
          </Row>
        </Container>
        
      </div>
    </div>
  );
};

export default Home;
