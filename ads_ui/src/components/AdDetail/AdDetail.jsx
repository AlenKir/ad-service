import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching.jsx";
import AdService from "../../API/AdService.js";
import styles from "./AdDetail.module.css";

const AdDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ad, setAd] = useState(null);

    const [fetchAd, isLoading, error] = useFetching(async () => {
        const response = await AdService.fetchAdDetails(id);
        setAd(response.data);
    });

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this ad?")) {
            try {
                await AdService.deleteAd(id);
                navigate("/");
            } catch (err) {
                console.error("Failed to delete ad:", err);
                alert("Something went wrong while deleting the ad.");
            }
        }
    };

    useEffect(() => {
        fetchAd();
    }, [id]);

    if (!ad) return <h2 className={styles.adDetail__notFound}>This advertisement seems to have vanished, assuming it was ever really here.</h2>;

    return (
        <article className={styles.adDetail}>
            <header className={styles.adDetail__header}>
                <h2>{ad.title} - {ad.price}€</h2>
                <button className={styles.adDetail__deleteBtn} onClick={handleDelete}>Delete</button>
            </header>
            <section className={styles.adDetail__body}>
                <p>{ad.descr}</p>
                <p>{ad.body}</p>
            </section>
            <footer className={styles.adDetail__footer}>
                <small>{ad.created_at}</small>
            </footer>
            {ad.photos && ad.photos.length > 0 && (
                <section className={styles.adDetail__images}>
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
                </section>
            )}
        </article>
    );
};

export default AdDetail;
