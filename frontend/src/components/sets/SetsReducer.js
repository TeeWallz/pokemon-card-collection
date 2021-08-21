import { GET_CARDS } from "./SetsTypes";

const initialState = {
  sets: []
};

export const setsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        sets: action.payload
      };
    default:
      return state;
  }
};
