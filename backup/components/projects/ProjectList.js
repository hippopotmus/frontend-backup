import React from "react";
import { useEffect } from "react";
//style imports
import { ProjectListSection } from "../../styles/project-styles/projectList.styles";
//components imports
import ProjectAddButton from "./ProjectAddButton";
import ProjectEDSButton from "./ProjectEDSButton";
//redux imports
import { connect } from "react-redux";
import { getProjects } from "../../actions/actions-for-projects";
import PropTypes from "prop-types";

const ProjectList = ({ getProjects, projects, loading }) => {
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  if (loading) {
    return <h2 className="">Loading...</h2>;
  }
  return (
    <ProjectListSection>
      {projects &&
        projects.map((project, i) => {
          const {
            id: projectId,
            attributes: { prjname },
          } = project;
          return <ProjectEDSButton key={i} prjname={prjname} projectId={projectId} />;
        })}
      <ProjectAddButton />
    </ProjectListSection>
  );
};

ProjectList.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = ({ projectListStore: { projects, loading } }) => {
  return { projects, loading };
};
const mapDispatchToProps = { getProjects };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
