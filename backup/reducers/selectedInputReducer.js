import { SET_LOADING, GET_SELECTED_INPUT_DETAIL } from "../actions/actions-for-projects";

const defaultState = {
  loading: false,
  detail: [],
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  if (type === SET_LOADING) {
    return { ...state, loading: true };
  }
  if (type === GET_SELECTED_INPUT_DETAIL) {
    return {
      ...state,
      loading: false,
      projects: payload,
    };
  }
  return state;
}
