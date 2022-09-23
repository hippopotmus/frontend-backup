import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Row,
  Col,
  CardText,
} from "reactstrap";
import { getPopulatedInputs } from "../../actions/actions-for-inputs";
import InputsItem from "./InputsItem";

const InputsList = ({ getPopulatedInputs, inputs }) => {
  const { prjname, projectId } = useParams();

  useEffect(() => {
    getPopulatedInputs(projectId);
  }, [getPopulatedInputs]);

  return (
    <Container>
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <h1>{prjname}</h1>
          {inputs &&
            inputs.map((input, index) => {
              const {
                id: inputId,
                attributes: { title, detail },
              } = input;
              {
                console.log(detail);
              }
              return <InputsItem inputId={inputId} title={title} detail={detail} />;
            })}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ inputListStore: inputs }) => {
  return inputs;
};

const mapDispatchToProps = { getPopulatedInputs };

export default connect(mapStateToProps, mapDispatchToProps)(InputsList);
