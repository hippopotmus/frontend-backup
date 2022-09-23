import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  CardText,
  Form,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import { getSelectedInput } from "../../actions/actions-for-inputs";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";

const SinglePost = ({
  createDate = "12/08/2022",
  project = "project",
  title = "title",
  detail = "some details",
  imageUrl = "https://unsplash.it/200/200",
  getSelectedInput,
}) => {
  const { inputId } = useParams();

  useEffect(() => {
    getSelectedInput(inputId);
  }, [inputId]);
  return (
    <Container>
      <Link to="/">Home</Link>
      <Row>
        <Col md={{ size: 12 }}>
          <h1>Load the post from database</h1>
          <Card>
            <CardBody>
              <CardText>
                Date By<b>{createDate}</b>
              </CardText>
              <CardText>
                <h3>{title}</h3>
              </CardText>
              <CardText>
                <h3>{detail}</h3>
              </CardText>
              <div>
                <img src={imageUrl} alt="image" />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ inputListStore: inputs }) => {
  return inputs;
};

const mapDispatchToProps = { getSelectedInput };

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
