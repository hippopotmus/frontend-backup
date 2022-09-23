import React from "react";
import { PageSection } from "../../styles/project-styles/projectsPage.styles";
import InputsHeader from "./InputsHeader";
import PopulatedInputs from "./PopulatedInputs";

const InputsPage = () => {
  return (
    <PageSection>
      <InputsHeader />
      <PopulatedInputs />
    </PageSection>
  );
};

export default InputsPage;
