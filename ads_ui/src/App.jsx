import { useEffect, useState } from "react";
import "./App.css";
import AdList from "./components/AdList.jsx";
import {useFetching} from "./hooks/useFetching.jsx";
import AdService from "./API/AdService.js";

function App() {
    const [adList, setAdList] = useState([]);

    const [fetchAds, isLoading, error] = useFetching(
        async (limit, page) => {
            const response = await AdService.fetchAdList();
            setAdList([...adList, ...response.data]);
        }
    )

    useEffect(() => {
        fetchAds()
    }, [])

    return (
        <>
            <AdList title="Advertisement board" adList={adList} />
        </>
    );
}

export default App;