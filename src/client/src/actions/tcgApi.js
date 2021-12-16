import { SET_TCG_CARDS } from "./types";

export const setCards = (cards) => ({
    type: SET_TCG_CARDS,
    payload: cards,
});

// export const clearMessage = () => ({
//     type: CLEAR_MESSAGE,
// });