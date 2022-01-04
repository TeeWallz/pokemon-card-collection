import axios from 'axios';
import authHeader from './auth-header';
import store from "../store";
import {enrichCollectionCardsWithTcgData} from "../helpers/tcgApiLocalData";
import { API_URL } from '../config/api_config'

// const API_BASE_URL = 'http://localhost:8080/api/';
// const API_URL = 'http://localhost:8080/api/collection';

class CollectionService {
    getAll() {
        return axios.get(API_URL + "collection");
    }

    getEpic(query) {
        let kek = API_URL;
        return new Promise(function(resolve, reject) {
            axios.get(API_URL + "epic", { params: query})
                .then((epic_cards => {
                    resolve(enrichCollectionCardsWithTcgData(epic_cards.data))
                }))
                .catch((error) => {
                    reject(error);
                })
        });

    }

    getOneDetail(id) {
        return axios.get(API_URL + "collection/" + id);


        // return axios
        //     .get(API_URL + "signin", { username, password })
        //     .then((response) => {
        //         if (response.data.accessToken) {
        //             localStorage.setItem("user", JSON.stringify(response.data));
        //         }
        //
        //         return response.data;
        //     });
    }

    postCollection(collection) {
        let headers = authHeader();
        headers.yeet = 'ass';

        return axios
            .post(API_URL + 'collection', collection, {headers: headers})
            ;
    }

    putCollection(id, collection) {
        return axios
            .put(API_URL + "collection/" + id,  collection)
            .then((response) => {
                alert("Done!")
            })
            .catch((err) => {
                console.log(err);
            })
            ;
    }

    getTcgApiQuery(query){
        return axios.get(API_URL + 'tcgApiQuery',
            { params: {query:query }}
            );
    }

    postTcgApiQuery(query){
        return axios.post(API_URL + 'tcgApiQuery',
            { data: {query:query }}
            );
    }

    deleteCollection(id){
        let headers = authHeader();
        headers.yeet = 'ass';

        // axios.delete(API_BASE_URL + 'collection' + "/" + id)

        return axios.delete(API_URL + 'collection' + "/" + id, {headers: headers})

    }

    patchCollectionCards(cards){
        let headers = authHeader();

        // axios.delete(API_BASE_URL + 'collection' + "/" + id)

        return axios.put(API_URL + 'collectionCards', {collectionCards: cards}, {headers: headers})
    }


}

export default new CollectionService();