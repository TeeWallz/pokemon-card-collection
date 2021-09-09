import axios from "axios";
import {toastOnError} from "../../utils/Utils";
import {GET_CARDS, ADD_CARD, DELETE_CARD, UPDATE_CARD, GET_FILTER_CARDS, GET_ARTISTS} from "./CardsTypes";

export const getCards = () => dispatch => {
    console.log("getCards!")
    axios
        .get("/api/v1/cards/")
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

export const getCardsFilter = query => dispatch => {
    console.log("getCardsFilter!")
    axios
        .get("/api/v1/cards/" + query)
        .then(response => {
            dispatch({
                type: GET_FILTER_CARDS,
                payload: {'query': query, 'cards': response.data.results}
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const addCard = card => dispatch => {
    axios
        .post("/api/v1/cards/", card)
        .then(response => {
            dispatch({
                type: ADD_CARD,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const deleteCard = id => dispatch => {
    axios
        .delete(`/api/v1/cards/${id}/`)
        .then(response => {
            dispatch({
                type: DELETE_CARD,
                payload: id
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const updateCard = (id, card) => dispatch => {
    axios
        .patch(`/api/v1/cards/${id}/`, card)
        .then(response => {
            dispatch({
                type: UPDATE_CARD,
                payload: response.data
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};

export const getArtists = () => dispatch => {
    console.log("getArtists!")
    axios
        .get("/api/v1/artists/")
        .then(response => {
            dispatch({
                type: GET_ARTISTS,
                payload: response.data.results
            });
        })
        .catch(error => {
            toastOnError(error);
        });
};