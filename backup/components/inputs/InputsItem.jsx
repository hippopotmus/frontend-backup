import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Card, CardBody, CardText, Form, Input, Label, Button } from "reactstrap";

const InputsItem = ({
  title = "this is default input title",
  detail = "This is default input content",
  inputId,
}) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card className="mb-3">
        <CardBody onClick={() => navigate("inputId")} inputId={inputId}>
          <h1>{title}</h1>
          {/* <CardText>{`${detail}`.substring(0, 30)}...</CardText> */}
          <div>
            <button>More details</button>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default InputsItem;
