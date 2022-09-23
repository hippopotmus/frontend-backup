import {
  GET_NEW_INPUT_GIST,
  MOUSE_SHOW_INPUT,
  MOUSE_HIDE_INPUT,
  CURSOR_SHOW_INPUT,
  CURSOR_HIDE_INPUT,
} from "../actions/actions-for-inputs";

const defaultState = {
  gistDetail: "",
  detailType: "",
  isHovered: false,
  isFocused: false,
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  if (type === GET_NEW_INPUT_GIST) {
    return {
      ...state,
      isHovered: state.isHovered,
      isFocused: state.isFocused,
      gistDetail: payload.gistDetail,
      detailType: payload.detailType,
    };
  }
  if (type === MOUSE_SHOW_INPUT) {
    return { ...state, isHovered: true, title: "" };
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
