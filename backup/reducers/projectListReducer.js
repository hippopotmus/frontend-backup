import { SET_LOADING, GET_PROJECTS } from "../actions/actions-for-projects";

const defaultState = {
  loading: false,
  projects: [],
};

export default function reducer(state = defaultState, action) {
  const { type, payload } = action;
  if (type === SET_LOADING) {
    return { ...state, loading: true };
  }
  if (type === GET_PROJECTS) {
    return {
      ...state,
      loading: false,
      projects: payload,
    };
  }
  return state;
}
