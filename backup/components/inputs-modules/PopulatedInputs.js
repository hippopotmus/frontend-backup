import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
//style imports
import { ri } from "../../react-icons";
import { InputsAccordion, InputContent } from "../../styles/input-styles/populatedInputs.styles";
//redux domain exports
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleAccordionDiv, getPopulatedInputs } from "../../actions/actions-for-inputs";
import InputDetails from "./InputDetails";
import InputTitleEDSBtn from "./InputTitleEDSBtn";
import GistAddButton from "./GistAddButton";

const PopulatedInputs = ({
  isEditOpen,
  isDeleteOpen,
  isSubmitOpen,
  inputs,
  loading,
  activeIndex,
  toggleAccordionDiv,
  getPopulatedInputs,
}) => {
  const { projectId } = useParams();

  const isActivated = isEditOpen || isDeleteOpen || isSubmitOpen;

  useEffect(() => {
    getPopulatedInputs(projectId);
  }, [getPopulatedInputs, projectId]);

  console.log(inputs);
  console.log(activeIndex);
  return (
    <section>
      <div className="">
        {inputs.map((input, index) => {
          const {
            id: inputId,
            attributes: { title: inputTitle, input_details },
          } = input;
          return (
            <InputsAccordion key={index}>
              <div className="accordion" key={index}>
                <div className="accordion__title">
                  <button //input title
                    className={activeIndex === index ? "active " : ""}
                    onClick={() => {
                      toggleAccordionDiv(activeIndex, index);
                    }}>
                    <ri.FaChevronRight
                      className={
                        activeIndex === index ? "toggleIcon toggleIcon__rotate " : "toggleIcon"
                      }
                    />
                    {isActivated ? (
                      //edit or delete input title button
                      <div className="editbtn__input__div">
                        <InputTitleEDSBtn
                          inputTitle={inputTitle}
                          projectId={projectId}
                          inputId={inputId}
                        />
                      </div>
                    ) : (
                      //display input title button
                      <div>
                        <h2>
                          {inputId} {inputTitle}
                        </h2>
                      </div>
                    )}
                  </button>
                  <GistAddButton inputId={inputId} />
                </div>
                <InputContent className={activeIndex === index ? "expand" : ""}>
                  <InputDetails
                    input_details={input_details}
                    inputId={inputId}
                    projectId={projectId}
                  />
                </InputContent>
              </div>
            </InputsAccordion>
          );
        })}
      </div>
    </section>
  );
};

PopulatedInputs.propTypes = {
  loading: PropTypes.bool.isRequired,
  activeIndex: PropTypes.number.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleAccordionDiv: PropTypes.func.isRequired,
  getPopulatedInputs: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  inputListStore: { inputs, loading, activeIndex },
  edsBtnStore: { isEditOpen, isDeleteOpen, isSubmitOpen },
}) => {
  return {
    inputs,
    loading,
    activeIndex,
    isEditOpen,
    isDeleteOpen,
    isSubmitOpen,
  };
};

export default connect(mapStateToProps, {
  getPopulatedInputs,
  toggleAccordionDiv,
})(PopulatedInputs);

// const InputsAccordion = styled.section`
//   .accordion__section {
//     padding: 3em;
//   }
//   .accordion {
//     padding: 0;
//     ${sf.setFlex({ dir: "column", ai: "stretch" })};
//   }
//   .expand {
//     max-height: 90vh;
//     scrollbar-width: none; //does not work
//   }
//   button {
//     ${sf.setFlex({ jc: "flex-start" })}
//     background-color: #fff;
//     border: none;
//     /* padding: 0.2em 1em; */
//     padding: 0;
//     &:hover {
//       background-color: #eee;
//     }
//     &.active {
//       background-color: #eee;
//       transition: background-color 0.6s ease;
//     }
//   }

//   .toggleIcon {
//     margin: 0.1em 1em;
//     transition: transform 0.6s ease;
//   }
//   .toggleIcon__rotate {
//     transform: rotate(90deg);
//   }
//   .editbtn__input__div {
//   }
//   .editbtn__input {
//     font-size: 1.4rem;
//     border: 0;
//     outline: 0;
//   }

//   .edit__button__icon {
//     align-self: flex-start;
//     color: rgba(64, 64, 79, 0.5);
//     &:hover {
//       color: rgba(64, 64, 79);
//     }
//   }
//   .BsCloudCheck {
//     color: green;
//     height: 2.4em;
//     width: 2.4em;
//     margin-right: 0.5em;
//   }
// `;

// const InputContent = styled.div`
//   background-color: white;
//   overflow-y: auto;
//   max-height: 0px;
//   transition: max-height 0.6s ease;
//   margin: 0;
//   padding: 0 3em;
// `;
