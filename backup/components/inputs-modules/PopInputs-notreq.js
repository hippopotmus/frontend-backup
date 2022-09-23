import React, { useState } from "react";
import { data } from "./data";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiPlus, FiMinus } from "react-icons/fi";
import InputDetails from "./InputDetails";

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  background: #fff;
`;

const Container = styled.div`
  position: absolute;
  top: 30%;
  box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

const InputTitle = styled.div`
  background: #272727;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;

  h1 {
    padding: 2rem;
    font-size: 2rem;
  }

  span {
    margin-right: 1.5rem;
  }
`;

const InputContent = styled.div`
  background: #1c1c1c;
  color: #00ffb9;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #00ffb9;
  border-top: 1px solid #00ffb9;

  p {
    font-size: 2rem;
  }
`;

const PopInputs = () => {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (
    <IconContext.Provider value={{ color: "#00FFB9", size: "25px" }}>
      <InputSection>
        <Container>
          {data.data.map((input, index) => {
            const {
              id: inputId,
              attributes: { title: inputTitle, input_details },
            } = input;
            return (
              <>
                <InputTitle onClick={() => toggle(index)} key={index}>
                  <h1>{inputTitle}</h1>
                  <span>{clicked === index ? <FiMinus /> : <FiPlus />}</span>
                </InputTitle>
                {clicked === index ? (
                  <InputContent>
                    {/* <p>{item.answer}</p> */}

                    <p>answer</p>
                    {/* {input_details.data.map((input_detail, i) => {
                      const {
                        id: detailId,
                        attributes: { detail, detail_type },
                      } = input_detail;
                      if (detail_type === "gist") {
                        return (
                          <div key={i}>
                            <p>gists for this input</p>
                            <h3>{detail}</h3>
                            <h3>{detail_type}</h3>
                          </div>
                        );
                      }
                      if (detail_type === "link") {
                        return (
                          <div key={i}>
                            <p>links for this input</p>
                            <h3>{detail}</h3>
                            <h3>{detail_type}</h3>
                          </div>
                        );
                      }
                      if (detail_type === "image") {
                        return (
                          <div key={i}>
                            <p>images for this input</p>
                            <h3>{detail}</h3>
                            <h3>{detail_type}</h3>
                          </div>
                        );
                      }
                    })} */}
                    <InputDetails input_details={input_details} />
                  </InputContent>
                ) : null}
              </>
            );
          })}
        </Container>
      </InputSection>
    </IconContext.Provider>
  );
};

export default PopInputs;
