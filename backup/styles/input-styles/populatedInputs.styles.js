import styled from "styled-components";
import { sf } from "../style-functions";

export const InputsAccordion = styled.section`
  .accordion__section {
    padding: 3em;
  }
  .accordion {
    padding: 0;
    ${sf.setFlex({ dir: "column", ai: "stretch" })};
  }
  .expand {
    max-height: 90vh;
    scrollbar-width: none; //does not work
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
    transition: transform 0.6s ease;
  }
  .toggleIcon__rotate {
    transform: rotate(90deg);
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
  .add_input__icon {
    color: red;
    font-size: 2em;
  }
  /* .accordion__title {
    ${sf.setFlex({})}
  } */
`;

export const InputContent = styled.div`
  background-color: white;
  overflow-y: auto;
  max-height: 0px;
  transition: max-height 0.6s ease;
  margin: 0;
  padding: 0 3em;
`;
