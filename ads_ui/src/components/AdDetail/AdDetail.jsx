import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching.jsx";
import AdService from "../../API/AdService.js";

const AdDetail = () => {
    const { id } = useParams();
    const [ad, setAd] = useState(null);

    const [fetchAd, isLoading, error] = useFetching(async () => {
        const response = await AdService.fetchAdDetails(id);
        setAd(response.data);
    });

    useEffect(() => {
        fetchAd();
    }, [id]);

    if (!ad) return <h2>No advertisement found.</h2>;

    return (
        <div>
            <div>
                <h2>{ad.title} - {ad.price}€</h2>
            </div>
            <div>
                <p>{ad.descr}</p>
                <p>{ad.body}</p>
            </div>
            <div>
                <small>{ad.created_at}</small>
            </div>
        </div>
    );
};

export default AdDetail;
