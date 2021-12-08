import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8080/api/';
const API_URL = 'http://localhost:8080/api/collection';

class CollectionService {
    getAll() {
        return axios.get(API_URL);
    }

    getEpic() {
        return axios.get(API_BASE_URL + "epic");
    }

    getOneDetail(id) {
        return axios.get(API_URL + "/" + id);


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
            .post(API_BASE_URL + 'collection', collection, {headers: headers})
            ;
    }

    putCollection(id, collection) {
        return axios
            .put(API_URL + "/" + id,  collection)
            .then((response) => {
                alert("Done!")
            })
            .catch((err) => {
                console.log(err);
            })
            ;
    }

    getTcgApiQuery(query){
        return axios.get(API_BASE_URL + 'tcgApiQuery',
            { params: {query:query }}
            );
    }

    deleteCollection(id){
        let headers = authHeader();
        headers.yeet = 'ass';

        // axios.delete(API_BASE_URL + 'collection' + "/" + id)

        return axios.delete(API_BASE_URL + 'collection' + "/" + id, {headers: headers})

    }
}

export default new CollectionService();