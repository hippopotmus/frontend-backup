import {
  GET_PRJNAME,
  MOUSE_SHOW_INPUT,
  MOUSE_HIDE_INPUT,
  CURSOR_SHOW_INPUT,
  CURSOR_HIDE_INPUT,
} from "../actions/actions-for-projects";

const defaultState = {
  prjname: "",
  isHovered: false,
  isFocused: false,
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  if (type === GET_PRJNAME) {
    return {
      ...state,
      isHovered: state.isHovered,
      isFocused: state.isFocused,
      prjname: payload.prjname,
    };
  }
  if (type === MOUSE_SHOW_INPUT) {
    return { ...state, isHovered: true, prjname: "" };
  }
  if (type === MOUSE_HIDE_INPUT) {
    return { ...state, isHovered: false };
  }
  if (type === CURSOR_SHOW_INPUT) {
    return { ...state, isFocused: true };
  }
  if (type === CURSOR_HIDE_INPUT) {
    return { ...state, isFocused: false };
  }
  return state;
}
