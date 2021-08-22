import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_COLLECTIONS, ADD_COLLECTION, DELETE_COLLECTION, UPDATE_COLLECTION } from "./CollectionsTypes";

export const getCollections = () => dispatch => {
    console.log("getCollections!")
  axios
    .get("/api/v1/collections/")
    .then(response => {
      dispatch({
        type: GET_COLLECTIONS,
        payload: response.data.results
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const addCollection = collection => dispatch => {
  axios
    .post("/api/v1/collections/", collection)
    .then(response => {
      dispatch({
        type: ADD_COLLECTION,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const deleteCollection = id => dispatch => {
  axios
    .delete(`/api/v1/collections/${id}/`)
    .then(response => {
      dispatch({
        type: DELETE_COLLECTION,
        payload: id
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const updateCollection = (id, collection) => dispatch => {
  axios
    .patch(`/api/v1/collections/${id}/`, collection)
    .then(response => {
      dispatch({
        type: UPDATE_COLLECTION,
        payload: response.data
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};
