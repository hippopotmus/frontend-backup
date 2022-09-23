import httpInstance from "../utils/http";

export const TOGGLE_HDR_EDIT_BTN = "TOGGLE_HDR_EDIT_BTN";
export const TOGGLE_HDR_DELETE_BTN = "TOGGLE_HDR_DELETE_BTN";
export const NO_EDIT_OR_DELETE_OPEN = "NO_EDIT_OR_DELETE_OPEN";
export const CHANGE_ICON_TO_SUBMIT = "CHANGE_ICON_TO_SUBMIT";

export const SET_LOADING = "SET_LOADING";
export const GET_PROJECTS = "GET_PROJECTS";

export const MOUSE_SHOW_INPUT = "MOUSE_SHOW_INPUT";
export const MOUSE_HIDE_INPUT = "MOUSE_HIDE_INPUT";
export const CURSOR_SHOW_INPUT = "CURSOR_SHOW_INPUT";
export const CURSOR_HIDE_INPUT = "CURSOR_HIDE_INPUT";

export const GET_PRJNAME_FROM_INPUT = "GET_PRJNAME_FROM_INPUT";
export const GET_PRJNAME = "GET_PRJNAME";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const SELECTED_PROJECT = "SELECTED_PROJECT";

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

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const getProjects = () => async (dispatch) => {
  dispatch(setLoading());
  const response = await httpInstance.get("/api/projects");
  const projectsArr = Object.values(response.data.data);
  dispatch({ type: GET_PROJECTS, payload: projectsArr });
};

export const mouseShowInput = () => {
  return { type: MOUSE_SHOW_INPUT };
};

export const mouseHideInput = () => {
  return { type: MOUSE_HIDE_INPUT };
};

export const cursorShowInput = () => {
  return { type: CURSOR_SHOW_INPUT };
};

export const cursorHideInput = () => {
  return { type: CURSOR_HIDE_INPUT };
};

export const getPrjname = (prjname) => {
  return { type: GET_PRJNAME, payload: { prjname } };
};

export const createProject = (params) => async (dispatch) => {
  const data = JSON.stringify({ data: { prjname: params } });
  await httpInstance.post("/api/projects", data);
  dispatch(getProjects());
};

export const updateProject = (eventVal, prjname, params, projectId) => async (dispatch) => {
  //there has to be a conditional onAlertPress(escapeKey, enterKey), modal can be used
  if (eventVal === true) {
    alert(`Project '${prjname}' is about to be renamed to '${params}'`);
    const data = JSON.stringify({ data: { prjname: params } });
    await httpInstance.put(`/api/projects/${projectId}`, data);
  } else {
    const data = JSON.stringify({ data: { prjname: prjname } });
    await httpInstance.put(`/api/projects/${projectId}`, data);
  }
  dispatch(noEditOrDeleteOpen());
  dispatch(getProjects());
};

export const deleteProject = (prjname, projectId) => async (dispatch) => {
  alert(`Project '${prjname}' is about to be deleted permanently`);
  await httpInstance.delete(`/api/projects/${projectId}`);
  dispatch(toggleHdrDeleteBtn());
  dispatch(getProjects());
};

export const selectedProject = (prjname, projectId) => {
  return { type: SELECTED_PROJECT, payload: { prjname, projectId } };
};
