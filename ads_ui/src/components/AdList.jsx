import styles from "./AdList.module.css";
import Ad from "./Ad.jsx";
import {useEffect, useState} from "react";
import {useFetching} from "../hooks/useFetching.jsx";
import AdService from "../API/AdService.js";

const AdList = ({ title }) => {
    const [adList, setAdList] = useState([]);

    const [fetchAds, isLoading, error] = useFetching(
        async (limit, page) => {
            const response = await AdService.fetchAdList();
            setAdList(response.data);
        }
    )

    useEffect(() => {
        fetchAds()
    }, [])


    if (!adList.length) {
        return <h1>No advertisements found.</h1>;
    }

    return (
        <div className={styles.adList}>
            <h1>{title}</h1>
            <div className={styles.adList__grid}>
                {adList.map((ad, index) => (
                    <Ad key={ad.id} ad={ad} />
                ))}
            </div>
        </div>
    );
};

export default AdList;