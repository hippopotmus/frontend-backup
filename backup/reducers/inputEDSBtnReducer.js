//eds btn = edit-delete-submit button
import {
  TOGGLE_HDR_EDIT_BTN,
  TOGGLE_HDR_DELETE_BTN,
  CHANGE_ICON_TO_SUBMIT,
  NO_EDIT_OR_DELETE_OPEN,
  SELECTED_INPUT,
} from "../actions/actions-for-inputs";

const defaultState = {
  isEditOpen: false,
  isDeleteOpen: false,
  isSubmitOpen: false,
  title: "",
  inputId: 0,
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  if (type === TOGGLE_HDR_EDIT_BTN) {
    return {
      ...state,
      isEditOpen: !state.isEditOpen,
      isDeleteOpen: false,
      isSubmitOpen: false,
    };
  }
  if (type === TOGGLE_HDR_DELETE_BTN) {
    return { ...state, isEditOpen: false, isDeleteOpen: !state.isDeleteOpen, isSubmitOpen: false };
  }
  if (type === NO_EDIT_OR_DELETE_OPEN) {
    return { ...state, isSubmitOpen: false, isDeleteOpen: false, isEditOpen: false };
  }
  if (type === CHANGE_ICON_TO_SUBMIT) {
    return {
      ...state,
      isEditOpen: false,
      isDeleteOpen: state.isDeleteOpen,
      isSubmitOpen: true,
    };
  }
  if (type === SELECTED_INPUT) {
    return {
      ...state,
      isEditOpen: false,
      isDeleteOpen: false,
      isSubmitOpen: false,
      title: payload.title,
      inputId: payload.inputId,
    };
  }
  return state;
}
