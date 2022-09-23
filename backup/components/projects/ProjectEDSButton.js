import React, { useRef } from "react";
import { Link } from "react-router-dom";
//style imports
import { ri } from "../../react-icons";
//style imports
import { EDSBtn } from "../../styles/project-styles/projectEDSBtn.styles";
//redux imports
// import { useSelector } from "react-redux";
import {
  changeIconToSubmit,
  updateProject,
  deleteProject,
  selectedProject,
} from "../../actions/actions-for-projects";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProjectEDSButton = ({
  prjname,
  projectId,
  isEditOpen,
  isDeleteOpen,
  isSubmitOpen,
  changeIconToSubmit,
  deleteProject,
  updateProject,
  selectedProject,
}) => {
  const isActivated = isEditOpen || isDeleteOpen || isSubmitOpen;
  const editOrDeleteTargetRef = useRef(null);
  // console.log(useSelector((store) => console.log(store)));
  return (
    <EDSBtn className="editbtn__input">
      {isActivated ? (
        <div className="editbtn__input__div">
          <input
            type="text"
            ref={editOrDeleteTargetRef}
            className="editbtn__input"
            placeholder={prjname}
            onKeyDown={changeIconToSubmit}></input>
          {/*edit prjname*/}
          <span>
            {isEditOpen && (
              <ri.MdEdit className="edit__button__icon " onClick={changeIconToSubmit} />
            )}
          </span>
          {/*delete prjname*/}
          <span>
            {isDeleteOpen && (
              <ri.RiDeleteBin6Line
                className="edit__button__icon "
                onClick={() => deleteProject(prjname, projectId)}
              />
            )}
          </span>
          {/*update prjname*/}
          <span>
            {isSubmitOpen && (
              <ri.BsCloudCheck
                className="edit__button__icon "
                onClick={(e) => {
                  var val = window.confirm(
                    `Project '${prjname}' is about to be renamed to '${editOrDeleteTargetRef.current.value}`
                  );
                  updateProject(val, prjname, editOrDeleteTargetRef.current.value, projectId);
                }}
              />
            )}
          </span>
        </div>
      ) : (
        <div>
          <Link to={`${projectId}/${prjname}`} onClick={() => selectedProject(prjname, projectId)}>
            {prjname}
          </Link>
        </div>
      )}
    </EDSBtn>
  );
};

ProjectEDSButton.propTypes = {
  isEditOpen: PropTypes.bool.isRequired,
  isDeleteOpen: PropTypes.bool.isRequired,
  isSubmitOpen: PropTypes.bool.isRequired,
  updateProject: PropTypes.func.isRequired,
  changeIconToSubmit: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  selectedProject: PropTypes.func.isRequired,
};

const mapStateToProps = ({ projectEDSBtnStore: { isEditOpen, isDeleteOpen, isSubmitOpen } }) => {
  return { isEditOpen, isDeleteOpen, isSubmitOpen };
};
const mapDispatchToProps = { updateProject, changeIconToSubmit, deleteProject, selectedProject };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectEDSButton);
