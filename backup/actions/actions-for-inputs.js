import httpInstance from "../utils/http";

export const TOGGLE_HDR_EDIT_BTN = "TOGGLE_HDR_EDIT_BTN";
export const TOGGLE_HDR_DELETE_BTN = "TOGGLE_HDR_DELETE_BTN";
export const NO_EDIT_OR_DELETE_OPEN = "NO_EDIT_OR_DELETE_OPEN";

export const SET_LOADING = "SET_LOADING";
export const GET_INPUTS = "GET_INPUTS";
export const GET_POPULATED_INPUTS = "GET_POPULATED_INPUTS";

export const MOUSE_SHOW_INPUT = "MOUSE_SHOW_INPUT";
export const MOUSE_HIDE_INPUT = "MOUSE_HIDE_INPUT";
export const CURSOR_SHOW_INPUT = "CURSOR_SHOW_INPUT";
export const CURSOR_HIDE_INPUT = "CURSOR_HIDE_INPUT";
export const CHANGE_ICON_TO_SUBMIT = "CHANGE_ICON_TO_SUBMIT";
export const TOGGLE_ACCORDION_DIV = "TOGGLE_ACCORDION_DIV";

export const GET_PRJNAME_FROM_INPUT = "GET_PRJNAME_FROM_INPUT";
export const GET_NEW_INPUT_TITLE = "GET_NEW_INPUT_TITLE";
export const GET_NEW_INPUT_GIST = "GET_NEW_INPUT_GIST";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const SELECTED_INPUT = "SELECTED_INPUT";
export const GET_SELECTED_INPUT_DETAIL = "GET_SELECTED_INPUT_DETAIL";

export const toggleHdrEditBtn = () => {
  return { type: TOGGLE_HDR_EDIT_BTN };
};

export const toggleHdrDeleteBtn = () => {
  return { type: TOGGLE_HDR_DELETE_BTN };
};

export const noEditOrDeleteOpen = () => {
  return { type: NO_EDIT_OR_DELETE_OPEN };
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const getNewInputTitle = (title) => {
  return { type: GET_NEW_INPUT_TITLE, payload: { title } };
};

export const getInputs = (projectId) => async (dispatch) => {
  dispatch(setLoading());
  const response = await httpInstance.get(`/api/inputs?filters[projects][id]=${projectId}`);
  const inputsArr = Object.values(response.data.data);
  dispatch({ type: GET_INPUTS, payload: inputsArr });
};

export const getPopulatedInputs = (projectId) => async (dispatch) => {
  dispatch(setLoading());
  const response = await httpInstance.get(
    `/api/inputs?populate[0]=projects&populate[1]=input_details&[filters][projects][id][$eq]=${projectId}`
    // `/api/inputs?populate[0]=projects&populate[1]=input_details&[filters][projects][id][$eq]=2`
  );
  const popinputsArr = Object.values(response.data.data);
  console.log(popinputsArr);
  dispatch({ type: GET_POPULATED_INPUTS, payload: popinputsArr });
};

export const getSelectedInput = (inputId) => async (dispatch) => {
  dispatch(setLoading());
  const response = await httpInstance.get(
    // `/api/inputs?populate[0]=projects&populate[1]=inputs&[filters][id][$eq]=${inputId}`
    `/api/inputs?populate[0]=projects&populate[1]=inputs&[filters][id][$eq]=63`
  );
  const selInputsArr = Object.values(response.data);
  console.log(selInputsArr);
  dispatch({ type: GET_SELECTED_INPUT_DETAIL, payload: selInputsArr });
};

export const createInput = (inputTitle, projectId) => async (dispatch) => {
  //checkout redux-persist to retain values on reloading the page
  const data = JSON.stringify({ data: { title: inputTitle, projects: projectId } });
  await httpInstance.post("/api/inputs", data);
  dispatch(getPopulatedInputs(projectId));
};

export const createGist = (gistDetail, detailType, inputId, projectId) => async (dispatch) => {
  //checkout redux-persist to retain values on reloading the page
  const data = JSON.stringify({
    data: { detail: gistDetail, detail_type: detailType, inputs: inputId },
  });
  await httpInstance.post("/api/input-details", data);
  dispatch(getPopulatedInputs(projectId));
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

export const changeIconToSubmit = (inputId) => {
  return { type: CHANGE_ICON_TO_SUBMIT };
};

export const toggleAccordionDiv = (activeIndex, index) => {
  if (activeIndex !== null) {
    return { type: TOGGLE_ACCORDION_DIV, payload: null };
  } else {
    return { type: TOGGLE_ACCORDION_DIV, payload: index };
  }
};

export const getNewInputGist = (gistDetail) => {
  return { type: GET_NEW_INPUT_GIST, payload: { gistDetail } };
};

export const updateInput =
  (eventVal, existingTitle, newTitle, inputId, projectId) => async (dispatch) => {
    if (eventVal === true) {
      alert(`Input '${existingTitle}' is about to be renamed to '${newTitle}'`);
      const data = JSON.stringify({ data: { title: newTitle, projects: projectId } });
      await httpInstance.put(`/api/inputs/${inputId}`, data);
    } else {
      const data = JSON.stringify({ data: { title: existingTitle, projects: projectId } });
      await httpInstance.put(`/api/inputs/${inputId}`, data);
    }
    dispatch(noEditOrDeleteOpen());
    dispatch(getPopulatedInputs(projectId));
  };

export const deleteProject = (title, inputId, projectid) => async (dispatch) => {
  alert(`Project '${title}' is about to be deleted permanently`);
  await httpInstance.delete(`/api/inputs/${inputId}`);
  dispatch(toggleHdrDeleteBtn());
  dispatch(getPopulatedInputs(projectid));
};

export const selectedProject = (prjname, projectId) => {
  return { type: SELECTED_INPUT, payload: { prjname, projectId } };
};
