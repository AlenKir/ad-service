import axios from "axios";


export default class AdService {
    static async fetchAdList() {
        return await
            axios.get(`http://127.0.0.1:8000/api/ads/`);
    }

    static async fetchAdDetails(id) {
        return await axios.get(`http://127.0.0.1:8000/api/ads/${id}`);
    }
}