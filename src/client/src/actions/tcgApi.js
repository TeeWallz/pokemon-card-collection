import {APPEND_TCG_CARDS, LOGOUT, SET_TCG_CARDS} from "./types";
import AuthService from "../services/auth.service";


export const setCards = (cards) => ({
        type: SET_TCG_CARDS,
        payload: cards,
});

// export const appendCards = (cards) => dispatch => {
//         type: APPEND_TCG_CARDS,
//         payload: cards,
// });

export const appendCards = (cards) => dispatch => {
        dispatch({
                type: 'APPEND_TCG_CARDS',
                payload: cards,
        });
        return Promise.resolve();
};

// export const clearMessage = () => ({
//     type: CLEAR_MESSAGE,
// });