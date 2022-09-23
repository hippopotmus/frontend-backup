import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
//style imports
import { ri } from "../../react-icons";
import styled from "styled-components";
import { sf } from "../../styles/style-functions";
//style imports
// import { EDSBtn } from "../../styles/projectEDSBtnCSS";
//redux imports
// import { useSelector } from "react-redux";
import { changeIconToSubmit } from "../../actions/actions-for-eds-buttons";
import { getInputGists } from "../../actions/actions-for-gists";
import {
  getInputs,
  toggleAccordionDiv,
  deleteProject,
  updateInput,
} from "../../actions/actions-for-inputs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputAddButton from "./InputAddButton";
// import GistList from "../gists/GistList";
import GistsList from "../gists/GistsList";

const InputList = ({
  isEditOpen,
  isDeleteOpen,
  isSubmitOpen,
  inputs,
  loading,
  activeIndex,
  getInputs,
  toggleAccordionDiv,
  deleteProject,
  updateInput,
  changeIconToSubmit,
}) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const projectid = parseInt(projectId);
  const isActivated = isEditOpen || isDeleteOpen || isSubmitOpen;
  const editOrDeleteInputRef = useRef();

  useEffect(() => {
    getInputs(projectId);
  }, [getInputs, projectId]);

  if (loading) {
    return <h2 className="">Loading...</h2>;
  }

  return (
    <InputListSection>
      <InputAddButton projectid={projectid} />
      <GistsList />
      <div>
        {inputs &&
          inputs.map((input, index) => {
            const {
              id: inputId,
              attributes: { title },
            } = input;
            return (
              <InputsAccordion key={index}>
                <div
                  className="accordion__blocks"
                  key={index}
                  title={title}
                  inputid={inputId}
                  projectid={projectid}
                >
                  <button
                    className={activeIndex === index ? "active " : ""}
                    onClick={() => {
                      toggleAccordionDiv(index);
                      // getInputGists();
                      navigate(`inputs/${inputId}`);
                    }}
                  >
                    <ri.FaChevronRight
                      className={
                        activeIndex === index ? "toggleIcon toggleIcon__rotate " : "toggleIcon"
                      }
                    />
                    {isActivated ? (
                      <div className="editbtn__input__div">
                        <input
                          type="text"
                          // style={{ backgroundColor: "red" }}
                          ref={editOrDeleteInputRef}
                          className="editbtn__input"
                          placeholder={title}
                          onKeyDown={changeIconToSubmit}
                        ></input>
                        {/*edit prjname*/}
                        <span>
                          {isEditOpen && (
                            <ri.MdEdit
                              className="edit__button__icon "
                              onClick={changeIconToSubmit}
                            />
                          )}
                        </span>
                        {/*delete prjname*/}
                        <span>
                          {isDeleteOpen && (
                            <ri.RiDeleteBin6Line
                              className="edit__button__icon "
                              onClick={() => {
                                deleteProject(title, inputId, projectid);
                              }}
                            />
                          )}
                        </span>
                        {/*update prjname*/}
                        <span>
                          {isSubmitOpen && (
                            <ri.BsCloudCheck
                              className="edit__button__icon "
                              onClick={(e) => {
                                console.log(editOrDeleteInputRef.current.value);
                              }}
                            />
                          )}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <h3>
                          {inputId} {title}
                        </h3>
                      </div>
                    )}
                  </button>
                  {/* <p
                    className={
                      activeIndex === index ? "accordion__contents expand" : "accordion__contents"
                    }
                  >
                    
                  </p> */}
                  <div
                    className={
                      activeIndex === index ? "accordion__contents expand" : "accordion__contents"
                    }
                  >
                    {/* <GistList projectid={projectid} inputid={inputId} /> */}

                    <div>Link div</div>
                    <div>Image div</div>
                  </div>
                </div>
              </InputsAccordion>
            );
          })}
      </div>
    </InputListSection>
  );
};

InputList.propTypes = {
  isEditOpen: PropTypes.bool.isRequired,
  isDeleteOpen: PropTypes.bool.isRequired,
  isSubmitOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  activeIndex: PropTypes.number.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  getInputs: PropTypes.func.isRequired,
  toggleAccordionDiv: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  changeIconToSubmit: PropTypes.func.isRequired,
  getInputGists: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  edsBtnStore: { isEditOpen, isDeleteOpen, isSubmitOpen },
  inputListStore: { inputs, loading, activeIndex },
}) => {
  return {
    isEditOpen,
    isDeleteOpen,
    isSubmitOpen,
    inputs,
    loading,
    activeIndex,
    getInputGists,
  };
};

export default connect(mapStateToProps, {
  getInputs,
  toggleAccordionDiv,
  deleteProject,
  updateInput,
  changeIconToSubmit,
})(InputList);

const InputListSection = styled.section`
  ${sf.setFlex({ dir: "column" })}
`;

const InputsAccordion = styled.section`
  .accordion__section {
    padding: 3em;
  }
  .accordion__blocks {
    padding: 0;
    ${sf.setFlex({ dir: "column", ai: "stretch" })};
  }
  button {
    ${sf.setFlex({ jc: "flex-start" })}
    background-color: #fff;
    border: none;
    /* padding: 0.2em 1em; */
    padding: 0;
    &:hover {
      background-color: #eee;
    }
    &.active {
      background-color: #eee;
      transition: background-color 0.6s ease;
    }
  }
  .toggleIcon {
    margin: 0.1em 1em;
    transition: transform 0.6s ease;
  }
  .toggleIcon__rotate {
    transform: rotate(90deg);
  }
  .accordion__contents {
    background-color: white;
    overflow-y: auto;
    max-height: 0px;
    transition: max-height 0.6s ease;
    margin: 0;
    padding: 0 3em;
  }
  .expand {
    max-height: 25vh;
    scrollbar-width: none; //does not work
  }

  .editbtn__input__div {
  }
  .editbtn__input {
    font-size: 1.4rem;
    border: 0;
    outline: 0;
  }

  .edit__button__icon {
    align-self: flex-start;
    color: rgba(64, 64, 79, 0.5);
    &:hover {
      color: rgba(64, 64, 79);
    }
  }
  .BsCloudCheck {
    color: green;
    height: 2.4em;
    width: 2.4em;
    margin-right: 0.5em;
  }
`;
