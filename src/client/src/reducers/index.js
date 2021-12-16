import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import tcgApi from "./tcgApi";

export default combineReducers({
    auth,
    message,
    tcgApi,
});