import axios from "axios";
import { toastOnError } from "../../../utils/Utils";
import {GET_POKEMON} from "./PokemonsTypes";

export const getPokemon = () => dispatch => {
    console.log("getPokemons!")
  axios
    .get("/api/v1/pokemon/")
    .then(response => {
      dispatch({
        type: GET_POKEMON,
        payload: response.data.results
      });
    })
    .catch(error => {
      toastOnError(error);
    });
};

