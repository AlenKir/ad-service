import styles from "./AdList.module.css";
import Ad from "../Ad/Ad.jsx";
import {useEffect, useState} from "react";
import {useFetching} from "../../hooks/useFetching.jsx";
import AdService from "../../API/AdService.js";
import {useNavigate} from "react-router-dom";
import {useAds} from "../../hooks/useAds.jsx";
import AdFilter from "../AdFilter/AdFilter.jsx";

const AdList = ({ title }) => {
    const [adList, setAdList] = useState([]);
    const navigate = useNavigate();

    const [fetchAds, isLoading, error] = useFetching(
        async (limit, page) => {
            const response = await AdService.fetchAdList();
            setAdList(response.data);
        }
    )

    useEffect(() => {
        fetchAds()
    }, [])

    const [filter, setFilter] = useState({sort: '', query: '',});
    const sortedAndSearchedAds = useAds(adList, filter.sort, filter.query);


    return (
        <div className={styles.adList}>
            <h1>{title}</h1>
            <button onClick={() => navigate("/create-ad")}>
                Place a new advert
            </button>
            <AdFilter filter={filter} setFilter={setFilter}/>
            {sortedAndSearchedAds.length === 0 ? (
                <h2>No advertisements found.</h2>
            ) : (
                <div className={styles.adList__grid}>
                    {sortedAndSearchedAds.map((ad, index) => (
                        <Ad key={ad.id} ad={ad} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdList;