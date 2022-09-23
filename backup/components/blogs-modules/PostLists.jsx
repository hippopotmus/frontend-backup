import React, { useEffect } from "react";
import { Container, Card, CardBody, Form, Input, Label, Button } from "reactstrap";

const PostItem = () => {
  useEffect(() => {
    const getPopulatedInputs = async (projectId = 2) => {
      const response = await httpInstance.get(
        `/api/inputs?populate[0]=projects&populate[1]=input_details&[filters][projects][id][$eq]=${projectId}`
        //   `/api/inputs?populate[0]=projects&populate[1]=input_details&[filters][projects][id][$eq]=2`
      );
      const popinputsArr = Object.values(response.data.data);
      console.log(popinputsArr);
      setInputs(popinputsArr);
    };
  }, [getPopulatedInputs]);
  return (
    <Container>
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h1>Inputs Count</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default PostItem;
