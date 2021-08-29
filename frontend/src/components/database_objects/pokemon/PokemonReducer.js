import {GET_POKEMON} from "./PokemonsTypes";

const initialState = {
  pokemon: [],
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload
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