import React, { useEffect, useRef, useState } from "react";
import { Container, Card, CardBody, Form, Input, Label, Button } from "reactstrap";
import httpInstance from "../../utils/http";
import JoditEditor from "jodit-react";
import { getNewInputTitle } from "../../actions/actions-for-inputs";
import { connect } from "react-redux";

const AddPost = ({ getNewInputTitle, title }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [inputs, setInputs] = useState([]);

  const newInputTitleRef = useRef(null);

  const getPopulatedInputs = async (projectId = 2) => {
    // console.log(title);
    const response = await httpInstance.get(
      `/api/inputs?populate[0]=projects&populate[1]=input_details&[filters][projects][id][$eq]=${projectId}`
      //   `/api/inputs?populate[0]=projects&populate[1]=input_details&[filters][projects][id][$eq]=2`
    );
    const popinputsArr = Object.values(response.data.data);
    console.log(popinputsArr);
    setInputs(popinputsArr);
  };

  useEffect(() => {
    // getNewInputTitle(newInputTitleRef.current.value);
    newInputTitleRef.current.value = "";
    getPopulatedInputs(2);
  }, []);

  return (
    <Container>
      <div className="wrapper">
        <Card>
          <CardBody>
            <h3>Input Titles</h3>
            <Form>
              <div className="my-3">
                <Label for="title">Post Input Title</Label>
                <Input
                  type="text"
                  // id="title"
                  placeholder="Enter here"
                  className="rounded-0"
                  ref={newInputTitleRef}
                  onChange={() => {
                    console.log("current.value", newInputTitleRef.current.value);
                    // getNewInputTitle(newInputTitleRef.current.value);
                  }}
                />
              </div>
              <div className="my-3">
                <Label for="content">Post Input Title</Label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  // config={config}
                  // tabIndex={1} // tabIndex of textarea
                  // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  onChange={(newContent) => setContent(newContent)}
                />
              </div>
              <div className="my-3">
                <Label for="category">Post Category </Label>
                <Input type="select" id="category" placeholder="Enter here" className="rounded-0">
                  <option disabled value={0}>
                    --Select category--
                  </option>

                  {inputs.map((input, index) => {
                    const {
                      id: inputId,
                      attributes: { title: inputTitle, input_details },
                    } = input;
                    return (
                      <option value={inputId} key={inputId}>
                        {inputTitle}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
      <Container>
        <button color="primary">Create Post</button>
        <button color="primary">Reset Content</button>
      </Container>
    </Container>
  );
};

const mapStateToProps = ({ inputAddBtnStore: { title } }) => {
  return { title };
};
const mapDispatchToProps = { getNewInputTitle };

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
