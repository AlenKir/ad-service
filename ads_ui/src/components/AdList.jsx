import styles from "./AdList.module.css";
import Ad from "./Ad.jsx";

const AdList = ({ adList, title }) => {
    if (!adList.length) {
        return <h1>No advertisements found.</h1>;
    }

    return (
        <div className={styles.adList}>
            <h1>{title}</h1>
            <div className={styles.adList__grid}>
                {adList.map((ad, index) => (
                    <Ad key={index} ad={ad} />
                ))}
            </div>
        </div>
    );
};

export default AdList;