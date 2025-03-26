import axios from "axios";
import Ad from "../components/Ad.jsx";


export default class AdService {
    static async fetchAdList() {
        return await
            axios.get(`http://127.0.0.1:8000/api/ads/`);
    }

    static async fetchAdDetails(id) {
        return await
            axios.get(`http://127.0.0.1:8000/api/ads/${id}/`);
    }

    static async createAd(param) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ads/create/', param, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}