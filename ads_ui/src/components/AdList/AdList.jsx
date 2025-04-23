import styles from "./AdList.module.css";
import Ad from "../Ad/Ad.jsx";
import {useEffect, useState} from "react";
import AdService from "../../API/AdService.js";
import {useNavigate} from "react-router-dom";
import AdFilter from "../AdFilter/AdFilter.jsx";

const AdList = ({ title }) => {
    const [adList, setAdList] = useState([]);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const [filter, setFilter] = useState({sort: '', query: '',});

    useEffect(() => {
        const fetchData = async () => {
            const response = await AdService.fetchAdList(page, filter.sort, filter.query);
            setAdList(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
        };
        fetchData();
    }, [page, filter.sort, filter.query]);

    return (
        <div className={styles.adList}>
            <h1>{title}</h1>
            <button onClick={() => navigate("/create-ad")}>
                Place a new advert
            </button>

            <AdFilter filter={filter} setFilter={setFilter}/>

            <div className={styles.pagination}>
                <button disabled={!previous} onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                <button disabled={!next} onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>

            {adList.length === 0 ? (
                <h2>No advertisements found.</h2>
            ) : (
                <div className={styles.adList__grid}>
                    {adList.map((ad, index) => (
                        <Ad key={ad.id} ad={ad} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdList;