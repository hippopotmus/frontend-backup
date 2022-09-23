export const TOGGLE_HDR_EDIT_BTN = "TOGGLE_HDR_EDIT_BTN";
export const TOGGLE_HDR_DELETE_BTN = "TOGGLE_HDR_DELETE_BTN";
export const NO_EDIT_OR_DELETE_OPEN = "NO_EDIT_OR_DELETE_OPEN";
export const CHANGE_ICON_TO_SUBMIT = "CHANGE_ICON_TO_SUBMIT";

export const toggleHdrEditBtn = () => {
  return { type: TOGGLE_HDR_EDIT_BTN };
};

export const toggleHdrDeleteBtn = () => {
  return { type: TOGGLE_HDR_DELETE_BTN };
};

export const noEditOrDeleteOpen = () => {
  return { type: NO_EDIT_OR_DELETE_OPEN };
};

export const changeIconToSubmit = (projectId) => {
  return { type: CHANGE_ICON_TO_SUBMIT };
};
