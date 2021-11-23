import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/collection/';

class CollectionService {
    getAll() {
        return axios.get(API_URL + 'all');
    }

    getOne() {
        return axios.get(API_URL + 'user', { headers: authHeader() });


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
}

export default new CollectionService();