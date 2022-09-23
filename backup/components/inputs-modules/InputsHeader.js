import React from "react";
import { useParams } from "react-router-dom";
import { ri } from "../../react-icons";
import { HeaderSection } from "../../styles/project-styles/projectsHeader.styles";
import { toggleHdrEditBtn, toggleHdrDeleteBtn } from "../../actions/actions-for-eds-buttons"; //make a common action
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import InputAddButton from "./InputAddButton";

const InputsHeader = ({ toggleHdrEditBtn, toggleHdrDeleteBtn }) => {
  const activeIndex = useSelector((store) => store.inputListStore.activeIndex);
  console.log("activeIndex from inputsheader", activeIndex);
  const { projectId, prjname } = useParams();

  return (
    <HeaderSection>
      <div className="projects_header">
        <h2 className=" inputs_header__color">
          {projectId}
          {prjname}
        </h2>
        <div className="projects_header__eds_btn">
          {/* <ri.MdEdit onClick={() => toggleHdrEditBtn(activeIndex)} /> */}
          <ri.MdEdit onClick={toggleHdrEditBtn} />
          <ri.RiDeleteBin6Line onClick={toggleHdrDeleteBtn} />
        </div>
      </div>
      <InputAddButton projectId={projectId} />
    </HeaderSection>
  );
};

InputsHeader.propTypes = {
  isEditOpen: PropTypes.bool.isRequired,
  isDeleteOpen: PropTypes.bool.isRequired,
  toggleHdrEditBtn: PropTypes.func.isRequired,
  toggleHdrDeleteBtn: PropTypes.func.isRequired,
};

const mapStateToProps = ({ edsBtnStore: { isEditOpen, isDeleteOpen } }) => {
  return { isEditOpen, isDeleteOpen };
};
const mapDispatchToProps = { toggleHdrEditBtn, toggleHdrDeleteBtn };
export default connect(mapStateToProps, mapDispatchToProps)(InputsHeader);
