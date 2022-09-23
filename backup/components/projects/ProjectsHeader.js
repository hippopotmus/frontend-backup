import React from "react";
//style imports
import { HeaderSection } from "../../styles/project-styles/projectsHeader.styles";
import { ri } from "../../react-icons";
//redux imports
import {
  toggleHdrEditBtn,
  toggleHdrDeleteBtn,
} from "../../../../backup/actions/actions-for-projects";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ProjectsHeader = ({ isEditOpen, isDeleteOpen, toggleHdrEditBtn, toggleHdrDeleteBtn }) => {
  return (
    <HeaderSection>
      <div className="projects_header">
        <h1 className="projects_header__color"> Projects</h1>
        <div className="projects_header__eds_btn">
          <ri.MdEdit onClick={toggleHdrEditBtn} />
          <ri.RiDeleteBin6Line onClick={toggleHdrDeleteBtn} />
        </div>
      </div>
    </HeaderSection>
  );
};

ProjectsHeader.propTypes = {
  isEditOpen: PropTypes.bool.isRequired,
  isDeleteOpen: PropTypes.bool.isRequired,
  toggleHdrEditBtn: PropTypes.func.isRequired,
  toggleHdrDeleteBtn: PropTypes.func.isRequired,
};

const mapStateToProps = ({ projectEDSBtnStore: { isEditOpen, isDeleteOpen } }) => {
  return { isEditOpen, isDeleteOpen };
};
const mapDispatchToProps = { toggleHdrEditBtn, toggleHdrDeleteBtn };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsHeader);
