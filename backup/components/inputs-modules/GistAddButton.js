import React, { useRef, useEffect } from "react";
//style imports
import { ri } from "../../react-icons";
import styled, { css } from "styled-components";
import { sf } from "../../styles/style-functions";
// import { AddBtn, ProjectInput } from "../../styles/projectAddBtnCSS";
//redux imports
import {
  getNewInputGist,
  createGist,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
} from "../../actions/actions-for-inputs";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const GistAddButton = ({
  inputId,
  projectId,
  gistDetail,
  detailType,
  getNewInputGist,
  createGist,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
  isHovered,
  isFocused,
}) => {
  const isActivated = isHovered || isFocused;
  const newGistRef = useRef();
  useEffect(() => {
    newGistRef.current.value = "";
  }, [isActivated]);

  return (
    <AddBtn
      className="button__div"
      onMouseEnter={mouseShowInput}
      onMouseLeave={mouseHideInput}
      onFocus={cursorShowInput}
      onBlur={cursorHideInput}
      hover={isActivated}>
      <ProjectInput
        type="text"
        className="button__input"
        isActivated={isActivated}
        ref={newGistRef}
        onChange={() => getNewInputGist(newGistRef.current.value)}
      />
      {isActivated ? (
        <ri.BsCloudCheck
          className="BsCloudCheck button__icon"
          onClick={() => createGist(gistDetail, (detailType = "gist"), inputId, projectId)}
        />
      ) : (
        <div>
          <button>Add Gist</button>
        </div>
      )}
    </AddBtn>
  );
};
GistAddButton.propTypes = {
  gistDetail: PropTypes.string.isRequired,
  detailType: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  createGist: PropTypes.func.isRequired,
  getNewInputGist: PropTypes.func.isRequired,
  mouseShowInput: PropTypes.func.isRequired,
  mouseHideInput: PropTypes.func.isRequired,
  cursorShowInput: PropTypes.func.isRequired,
  cursorHideInput: PropTypes.func.isRequired,
};
const mapStateToProps = ({
  inputDetailAddBtnStore: { gistDetail, detailType, isHovered, isFocused },
}) => {
  return { gistDetail, detailType, isHovered, isFocused };
};

export default connect(mapStateToProps, {
  getNewInputGist,
  createGist,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
})(GistAddButton);

const AddBtn = styled.div`
  border: 4px solid tomato;
  border-radius: 0.5em;
  width: ${sf.setRem(48)}em;
  height: ${sf.setRem(48)}em;
  ${sf.setFlex({})}

  ${({ hover }) =>
    hover &&
    css`
      width: 25%;
    `}
    
  .button__icon {
    color: tomato;
    height: 2em;
    width: 2em;
  }
  .BsCloudCheck {
    color: green;
    height: 2.4em;
    width: 2.4em;
    margin-right: 0.5em;
  }
  transition: all 0.5s;
`;
const ProjectInput = styled.input`
  width: 85%;
  height: ${sf.setRem(40)}rem;
  border: 0;
  box-sizing: border-box;
  outline: 0;
  border-radius: 2em;
  display: ${(props) => (props.isActivated ? "block" : "none")};
  font-size: 1.4rem;
  padding: 20px 20px;
  margin: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;
