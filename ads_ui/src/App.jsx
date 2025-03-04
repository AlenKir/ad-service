import { useEffect, useState } from "react";
import "./App.css";
import AdList from "./components/AdList.jsx";

function App() {
    const [adList, setAdList] = useState([]);

    useEffect(() => {
        fetchAdList();
    }, []);

    const fetchAdList = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/ads/");
            const data = await response.json();
            setAdList(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <AdList title="Advertisements" adList={adList} />
        </>
    );
}

export default App;