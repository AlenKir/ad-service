import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching.jsx";
import AdService from "../../API/AdService.js";
import styles from "./AdDetail.module.css";

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

    if (!ad) return <h2 className={styles.adDetail__notFound}>This advertisement seems to have vanished, assuming it was ever really here.</h2>;

    return (
        <div className={styles.adDetail}>
            <div className={styles.adDetail__header}>
                <h2>{ad.title} - {ad.price}€</h2>
            </div>
            <div className={styles.adDetail__body}>
                <p>{ad.descr}</p>
                <p>{ad.body}</p>
            </div>
            <div className={styles.adDetail__footer}>
                <small>{ad.created_at}</small>
            </div>
            {ad.photos && ad.photos.length > 0 && (
                <div className={styles.adDetail__images}>
                    <h3>Images</h3>
                    <div className={styles.adDetail__imageGallery}>
                        {ad.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo.image}
                                alt={`Ad image ${index + 1}`}
                                className={styles.adDetail__image}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdDetail;