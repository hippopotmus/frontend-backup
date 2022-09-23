//eds btn = edit-delete-submit button
import {
  TOGGLE_HDR_EDIT_BTN,
  TOGGLE_HDR_DELETE_BTN,
  CHANGE_ICON_TO_SUBMIT,
  NO_EDIT_OR_DELETE_OPEN,
} from "../actions/actions-for-eds-buttons";

const defaultState = {
  isEditOpen: false,
  isDeleteOpen: false,
  isSubmitOpen: false,
};

export default function reducer(state = defaultState, action) {
  const { type } = action;
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
      isDeleteOpen: false,
      isSubmitOpen: true,
    };
  }
  return state;
}
