import {GET_SETS, GET_SET_CARDS} from "./SetsTypes";

const initialState = {
  sets: []
};

export const setsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETS:
      return {
        ...state,
        sets: action.payload
      };
   case GET_SET_CARDS:
      return {
        ...state,
        set_cards: action.payload
      };
    default:
      return state;
  }
};
