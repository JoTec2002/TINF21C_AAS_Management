import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { DetailsProdukt, Mydocs, NavComponent, Produkte } from "../components";
import ErrorHandling from "../components/ErrorHandling";
import axios from "axios";
import { API_URL } from "../utils/constanst";

function Guest() {
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorLog, setErrorLog] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL + "shells")
      .then(res => {
        console.log("Response : ", res);
        setSelectedData(res.data[0]);
        setLoading(false);
      })
      .catch(error => {
        setErrorLog(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <NavComponent />
      <div style={{ paddingTop: 20, paddingBottom: 100 }}>
        <Container>
          <Row>
            {errorLog && <ErrorHandling errorLog={errorLog} />}
            {!loading && (
              <>
                <Produkte onSelect={setSelectedData} />
                <DetailsProdukt data={selectedData} />
              </>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Guest;
