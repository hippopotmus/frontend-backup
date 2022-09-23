import React, { useRef } from "react";
//style imports
import { ri } from "../../react-icons";
//redux imports
import { changeIconToSubmit } from "../../actions/actions-for-eds-buttons";
import { deleteProject, updateInput } from "../../actions/actions-for-inputs";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const InputTitleEDSBtn = ({
  inputTitle,
  projectId,
  inputId,
  isEditOpen,
  isDeleteOpen,
  isSubmitOpen,
  updateInput,
  changeIconToSubmit,
  deleteProject,
}) => {
  const editOrDeleteInputRef = useRef();
  return (
    <>
      <input
        type="text"
        ref={editOrDeleteInputRef}
        className="editbtn__input"
        placeholder={inputTitle}
        onKeyDown={changeIconToSubmit}></input>
      {/*edit input title*/}
      <span>
        {isEditOpen && <ri.MdEdit className="edit__button__icon " onClick={changeIconToSubmit} />}
      </span>
      {/*delete input title*/}
      <span>
        {isDeleteOpen && (
          <ri.RiDeleteBin6Line
            className="edit__button__icon "
            onClick={() => {
              deleteProject(inputTitle, inputId, projectId);
            }}
          />
        )}
      </span>
      {/*update input title*/}
      <span>
        {isSubmitOpen && (
          <ri.BsCloudCheck
            className="edit__button__icon "
            onClick={(e) => {
              console.log(editOrDeleteInputRef.current.value);
              var eventVal = window.confirm(
                `Input '${inputTitle}' is about to be renamed to '${editOrDeleteInputRef.current.value}`
              );
              updateInput(
                eventVal,
                inputTitle,
                editOrDeleteInputRef.current.value,
                inputId,
                projectId
              );
            }}
          />
        )}
      </span>
    </>
  );
};

InputTitleEDSBtn.propTypes = {
  isEditOpen: PropTypes.bool.isRequired,
  isDeleteOpen: PropTypes.bool.isRequired,
  isSubmitOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  activeIndex: PropTypes.number.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateInput: PropTypes.func.isRequired,
  changeIconToSubmit: PropTypes.func.isRequired,
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
  };
};

export default connect(mapStateToProps, {
  deleteProject,
  updateInput,
  changeIconToSubmit,
})(InputTitleEDSBtn);
