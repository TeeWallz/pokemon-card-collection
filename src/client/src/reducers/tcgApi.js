import {
    SET_TCG_CARDS,
    APPEND_TCG_CARDS
} from "../actions/types";



const cards = JSON.parse(localStorage.getItem("cards")) || []
const generateCardsDict = function (cards){
    let cards_dict = cards.reduce((a,x) => ({...a, [x.id]: x}), {})
    return {
        cards: {
            array: cards,
            dict: cards_dict,
        }
    }
}

const initialState = generateCardsDict(cards);

export default function (state = initialState, action) {


    const { type, payload } = action;

    switch (type) {
        case SET_TCG_CARDS:
            console.log("SET_TCG_CARDS -> ", payload)
            return {
                ...state,
                cards: generateCardsDict(payload)
            };

        case APPEND_TCG_CARDS:
            let new_card_array = [...state.cards.array];
            let state_card_ids = Object.keys(state.cards.dict);

            payload.forEach(function (new_card) {
                if(!(new_card.id in state_card_ids)){
                    new_card_array.push(new_card);
                }
            });

            localStorage.setItem('cards', JSON.stringify(new_card_array));

            return {
                ...state,
                ...generateCardsDict( new_card_array )
            };

        default:
            return state;
    }
}