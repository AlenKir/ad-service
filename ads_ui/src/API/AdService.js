import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default class AdService {
    static async fetchAdList() {
        return await axios.get(`${API_URL}/api/ads/`);
    }

    static async fetchAdDetails(id) {
        return await axios.get(`${API_URL}/api/ads/${id}/`);
    }

    static async createAd(data) {
        try {
            return await axios.post(`${API_URL}/api/ads/create/`, data, {});
        } catch (error) {
            console.error(error);
        }
    }

    static async updateAd(id, formData) {
        try {
            return await axios.put(`${API_URL}/api/ads/${id}/update/`, formData, {});
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteAd(id) {
        try {
            return await axios.delete(`${API_URL}/api/ads/${id}/delete/`);
        }
        catch (error) {
           console.error(error);
        }
    }
}