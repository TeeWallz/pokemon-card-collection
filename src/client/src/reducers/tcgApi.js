import {
    SET_TCG_CARDS,
    // CLEAR_MESSAGE
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_TCG_CARDS:
            return { cards: payload };

        default:
            return state;
    }
}