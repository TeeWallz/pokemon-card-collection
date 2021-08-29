import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_SETS } from "./SetsTypes";

export const getSets = () => dispatch => {
    console.log("getSets!")
  axios
    .get("/api/v1/sets/")
    .then(response => {
      dispatch({
        type: GET_SETS,
        payload: response.data.results
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

export const createCollectionFromSet = () => dispatch => {
    console.log("createCollectionFromSet!")
  axios
    .get("/api/v1/sets/")
    .then(response => {
      dispatch({
        type: GET_SETS,
        payload: response.data.results
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};



