// import {createBrowserHistory} from "./history";
import CollectionService from "../services/collection.service"
import pokemon from "pokemontcgsdk";
import {appendCards, setCards} from "../actions/tcgApi";
import store from "../store";
pokemon.configure({apiKey: '4440c304-d5c0-4939-b533-5befa084795c'})

// export const history = createBrowserHistory();

// export const loadCardsInLocal = (ids_array) => (dispatch) => {
export const getCardsNotInLocal = (ids_array) => {
    return new Promise((resolve, reject) => {
        // Get Cards from the Redux store, read from Local storage
        const {tcgApi} = store.getState();
        // const ids_in_store = tcgApi.cards.map((card) => {return card.id})
        const ids_in_store = Object.keys(tcgApi.cards.dict);
        ids_in_store.sort();
        ids_array.sort();
        // ids_array = ids_array.slice(0,  90)

        console.log(ids_in_store);
        console.log(ids_array);
        const ids_needed = ids_array.filter(function(id) {
            let in_store = ids_in_store.includes(id);
            if(!in_store){

            }
            return !in_store;

        })
        // debugger;

        console.log(`${ids_needed.length} cards to be obtained from API`);
        if(ids_needed.length === 0){
            return;
        }
        else{
            debugger;
        }

        var i,j, temporary, chunk = 100, promises = [];
        for (i = 0,j = ids_array.length; i < j; i += chunk) {
            temporary = ids_needed.slice(i, i + chunk);

            let ids_query = temporary.reduce((a, b) => (`id:${b} OR ${a}`), "");
            ids_query = ids_query.slice(0, -4)
            console.log(ids_query);
            let kek = 1
            if(ids_query !== ''){
                promises.push( CollectionService.postTcgApiQuery(ids_query) )
            }


        }

        Promise.all(promises).then((api_pull_chunk) => {
            let cards = [];
            for (i = 0; i < api_pull_chunk.length; i += 1) {
                cards = cards.concat(api_pull_chunk[i].data)
            }
            console.log("Loading " + cards.length + " cards into local.")

            store.dispatch(appendCards(cards)).then((result) => {
                resolve(result);
            })
        });
    });

    // debugger;

    // AuthService.logout();

    // dispatch({
    //     type: LOGOUT,
    // });
};

export const enrichCollectionCardsWithTcgData = (collectionCards) => {
    const {tcgApi} = store.getState();
    const currentCardKeys = Object.keys(tcgApi.cards.dict)
    currentCardKeys.sort();

    collectionCards.forEach(function(part, index, theArray) {
        if(currentCardKeys.includes(theArray[index].cardId)) {
            theArray[index]['rarity'] = tcgApi.cards.dict[theArray[index].cardId].rarity
            theArray[index]['name'] = tcgApi.cards.dict[theArray[index].cardId].name
            theArray[index]['setName'] = tcgApi.cards.dict[theArray[index].cardId].set.name
            theArray[index]['setReleaseDate'] = tcgApi.cards.dict[theArray[index].cardId].set.releaseDate
            theArray[index]['numberFull'] = tcgApi.cards.dict[theArray[index].cardId].number + "/" + tcgApi.cards.dict[theArray[index].cardId].set.printedTotal
        }
        else{
            theArray[index]['rarity'] = "Loading...";
            theArray[index]['name'] = "Loading...";
            theArray[index]['setName'] = "Loading...";
        }
    });

    return collectionCards;
}