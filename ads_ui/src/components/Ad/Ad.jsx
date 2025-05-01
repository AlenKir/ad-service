import { Link } from "react-router-dom";
import styles from "./Ad.module.css";

const Ad = ({ ad }) => {
    return (
        <article className={styles.adCard}>
            <Link to={`/ads/${ad.id}`}>
                <div className={styles.adCard__header}>
                    <h2>
                        {ad.title} - {ad.price}€
                    </h2>
                </div>
                <div className={styles.adCard__body}>
                    <p>{ad.descr}</p>
                </div>
                <div className={styles.adCard__footer}>
                    <small>{ad.created_at}</small>
                </div>
            </Link>
        </article>
    );
};

export default Ad;
