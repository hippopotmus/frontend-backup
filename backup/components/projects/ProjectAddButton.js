import React, { useRef, useEffect } from "react";
//style imports
import { ri } from "../../../../backup/react-icons";
import { AddBtn, ProjectInput } from "../../styles/project-styles/projectAddBtn.styles";
//redux imports
import {
  getPrjname,
  createProject,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
} from "../../../../backup/actions/actions-for-projects";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProjectEDSButton = ({
  prjname,
  isHovered,
  isFocused,
  getPrjname,
  createProject,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
}) => {
  const isActivated = isHovered || isFocused;

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.value = "";
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
        ref={inputRef}
        onChange={() => getPrjname(inputRef.current.value)}
      />
      {isActivated ? (
        <ri.BsCloudCheck
          className="BsCloudCheck button__icon"
          onClick={() => createProject(prjname)}
        />
      ) : (
        <ri.GoPlus className="goplus button__icon" />
      )}
    </AddBtn>
  );
};

ProjectEDSButton.propTypes = {
  prjname: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
  getPrjname: PropTypes.func.isRequired,
  mouseShowInput: PropTypes.func.isRequired,
  mouseHideInput: PropTypes.func.isRequired,
  cursorShowInput: PropTypes.func.isRequired,
  cursorHideInput: PropTypes.func.isRequired,
};

const mapStateToProps = ({ projectAddBtnStore: { prjname, isHovered, isFocused } }) => {
  return { prjname, isHovered, isFocused };
};

export default connect(mapStateToProps, {
  getPrjname,
  createProject,
  mouseShowInput,
  mouseHideInput,
  cursorShowInput,
  cursorHideInput,
})(ProjectEDSButton);
