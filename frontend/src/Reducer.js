import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { loginReducer } from "./components/login/LoginReducer";
import { notesReducer } from "./components/notes/NotesReducer";
import { cardsReducer } from "./components/cards/CardsReducer.js";
import {setsReducer} from "./components/sets/SetsReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: loginReducer,
    notes: notesReducer,
    cards: cardsReducer,
    sets: setsReducer,
  });

export default createRootReducer;
