import { GET_CARDS, ADD_CARD, UPDATE_CARD, DELETE_CARD } from "./CardsTypes";

const initialState = {
  cards: []
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.payload
      };
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload]
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((item, index) => item.id !== action.payload)
      };
    case UPDATE_CARD:
      const updatedCards = state.cards.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      return {
        ...state,
        cards: updatedCards
      };
    default:
      return state;
  }
};
