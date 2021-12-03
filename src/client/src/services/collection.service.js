import axios from 'axios';
import authHeader from './auth-header';

const API_BASE_URL = 'http://localhost:8080/api/';
const API_URL = 'http://localhost:8080/api/collection/';

class CollectionService {
    getAll() {
        return axios.get(API_URL);
    }

    getOneDetail(id) {
        return axios.get(API_URL + id);


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

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    putCollection(id, collection) {
        return axios
            .put(API_URL + id,  collection)
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
}

export default new CollectionService();