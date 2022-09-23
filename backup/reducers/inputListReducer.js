import {
  SET_LOADING,
  GET_INPUTS,
  TOGGLE_ACCORDION_DIV,
  GET_POPULATED_INPUTS,
} from "../actions/actions-for-inputs";

const defaultState = {
  loading: false,
  inputs: [],
  activeIndex: null,
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  if (type === SET_LOADING) {
    return { ...state, loading: true };
  }
  if (type === GET_INPUTS) {
    return {
      ...state,
      loading: false,
      inputs: payload,
    };
  }
  if (type === TOGGLE_ACCORDION_DIV) {
    return {
      ...state,
      loading: false,
      inputs: state.inputs,
      activeIndex: payload,
    };
  }
  if (type === GET_POPULATED_INPUTS) {
    return {
      ...state,
      loading: false,
      inputs: payload,
    };
  }
  return state;
}
