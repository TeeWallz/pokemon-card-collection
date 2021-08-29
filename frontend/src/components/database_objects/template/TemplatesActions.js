import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import {GET_TEMPLATES, ADD_TEMPLATE, DELETE_TEMPLATE, UPDATE_TEMPLATE, GET_FILTER_TEMPLATES} from "./TemplatesTypes";

export const getTemplates = () => dispatch => {
    console.log("getTemplates!")
  axios
    .get("/api/v1/templates/")
    .then(response => {
      dispatch({
        type: GET_TEMPLATES,
        payload: response.data.results
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const getTemplatesFilter = query => dispatch => {
    console.log("getTemplatesFilter!")
  axios
    .get("/api/v1/templates/" + query)
    .then(response => {
      dispatch({
        type: GET_FILTER_TEMPLATES,
        payload: {'query': query , 'templates': response.data.results}
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const addTemplate = template => dispatch => {
  axios
    .post("/api/v1/templates/", template)
    .then(response => {
      dispatch({
        type: ADD_TEMPLATE,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const deleteTemplate = id => dispatch => {
  axios
    .delete(`/api/v1/templates/${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_TEMPLATE,
        payload: id
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const updateTemplate = (id, template) => dispatch => {
  axios
    .patch(`/api/v1/templates/${id}/`, template)
    .then(response => {
      dispatch({
        type: UPDATE_TEMPLATE,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};
