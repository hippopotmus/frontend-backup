import React, { useRef, useEffect } from "react";
//style imports
import { ri } from "../../react-icons";
import { AddBtn, ProjectInput } from "../../styles/project-styles/projectAddBtn.styles";
//redux imports
import {
  getNewInputTitle,
  createInput,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
} from "../../actions/actions-for-inputs";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const InputAddButton = ({
  projectId,
  title,
  getNewInputTitle,
  createInput,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
  isHovered,
  isFocused,
}) => {
  const isActivated = isHovered || isFocused;
  const newInputRef = useRef();
  useEffect(() => {
    newInputRef.current.value = "";
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
        ref={newInputRef}
        onChange={() => getNewInputTitle(newInputRef.current.value)}
      />
      {isActivated ? (
        <ri.BsCloudCheck
          className="BsCloudCheck button__icon"
          onClick={() => createInput(title, projectId)}
        />
      ) : (
        <ri.GoPlus className="goplus button__icon" />
      )}
    </AddBtn>
  );
};
InputAddButton.propTypes = {
  title: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  createInput: PropTypes.func.isRequired,
  getNewInputTitle: PropTypes.func.isRequired,
  mouseShowInput: PropTypes.func.isRequired,
  mouseHideInput: PropTypes.func.isRequired,
  cursorShowInput: PropTypes.func.isRequired,
  cursorHideInput: PropTypes.func.isRequired,
};
const mapStateToProps = ({ inputAddBtnStore: { title, isHovered, isFocused } }) => {
  return { title, isHovered, isFocused };
};

export default connect(mapStateToProps, {
  getNewInputTitle,
  createInput,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
})(InputAddButton);
