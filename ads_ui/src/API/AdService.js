import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default class AdService {
    static async fetchAdList() {
        return await axios.get(`${API_URL}/api/ads/`);
    }

    static async fetchAdDetails(id) {
        return await axios.get(`${API_URL}/api/ads/${id}/`);
    }

    static async createAd(param) {
        try {
            const response = await axios.post(`${API_URL}/api/ads/create/`, param, {
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