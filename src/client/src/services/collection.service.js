import axios from 'axios';
import authHeader from './auth-header';
const config = require('../config/api_config');

const API_COLLECTION_URL = config.API_BASE_URL + 'collection';
const API_COLLECTIONCARDS_URL = config.API_BASE_URL + 'collectionCards';
const API_EPIC_URL = config.API_BASE_URL + 'epic';
const API_TCGAPI_URL = config.API_BASE_URL + 'tcgApiQuery';

class CollectionService {
    getAll() {
        return axios.get(API_COLLECTION_URL);
    }

    getEpic(query) {
        // return axios.get(API_BASE_URL + "epic", { params: {collectionId: 'db8a0cd0-558d-11ec-8e83-fdb9d4163a20'}});
        return axios.get(API_EPIC_URL, { params: query});
    }

    getOneDetail(id) {
        return axios.get(API_COLLECTION_URL + "/" + id);


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
            .post(API_COLLECTION_URL, collection, {headers: headers})
            ;
    }

    putCollection(id, collection) {
        return axios
            .put(API_COLLECTION_URL + "/" + id,  collection)
            .then((response) => {
                alert("Done!")
            })
            .catch((err) => {
                console.log(err);
            })
            ;
    }

    getTcgApiQuery(query){
        return axios.get(API_TCGAPI_URL,
            { params: {query:query }}
            );
    }

    deleteCollection(id){
        let headers = authHeader();
        headers.yeet = 'ass';

        // axios.delete(API_BASE_URL + 'collection' + "/" + id)

        return axios.delete(API_COLLECTION_URL + "/" + id, {headers: headers})

    }

    patchCollectionCards(cards){
        let headers = authHeader();

        // axios.delete(API_BASE_URL + 'collection' + "/" + id)

        return axios.put(API_COLLECTIONCARDS_URL, {collectionCards: cards}, {headers: headers})
    }


}

export default new CollectionService();