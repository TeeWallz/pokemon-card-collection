import axios from "axios";
import { toastOnError } from "../../utils/Utils";
import { GET_CARDS} from "./SetsTypes";

export const getSets = () => dispatch => {
    console.log("getSets!")
  axios
    .get("/api/v1/sets/")
    .then(response => {
      dispatch({
        type: GET_CARDS,
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
        type: GET_CARDS,
        payload: response.data.results
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};



