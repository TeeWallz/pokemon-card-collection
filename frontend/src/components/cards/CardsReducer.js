import {GET_CARDS, ADD_CARD, UPDATE_CARD, DELETE_CARD, GET_FILTER_CARDS, GET_ARTISTS} from "./CardsTypes";

const initialState = {
  cards: [],
  set_cards: {},
  artists: []
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
    case GET_FILTER_CARDS:

      let copy_set_cards = { ...state.set_cards}; //create a new copy
      copy_set_cards[action.payload.query] = action.payload.cards;
      console.log({
        ...state,
        set_cards: copy_set_cards
      })
      return {
        ...state,
        set_cards: copy_set_cards
      };
    case GET_ARTISTS:

        return {
        ...state,
        artists: action.payload
      };

    default:
      return state;
  }
};

//
// this.setState(oldState => {
//   return {
//     foo: {
//       ...oldState.foo,
//       [keyToChange]: value
//     }
//   }
// });