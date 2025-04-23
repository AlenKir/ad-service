import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default class AdService {
    static async fetchAdList(page=1, sort, query) {
        try {
            return await axios.get(`${API_URL}/api/ads/`,
                {
                    params: {
                        page,
                        ordering: sort,
                        search: query
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    static async fetchAdDetails(id) {
        return await axios.get(`${API_URL}/api/ads/${id}/`);
    }

    static async createAd(data) {
        try {
            return await axios.post(`${API_URL}/api/ads/create/`, data, {});
        } catch (error) {
            console.log(error);
        }
    }

    static async updateAd(id, formData) {
        try {
            return await axios.put(`${API_URL}/api/ads/${id}/update/`, formData, {});
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteAd(id) {
        try {
            return await axios.delete(`${API_URL}/api/ads/${id}/delete/`);
        }
        catch (error) {
           console.log(error);
        }
    }
}