import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [ads, setAds] = useState([]);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/ads/");
            const data = await response.json();
            setAds(data);
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <>
        <h1>Advertisement Board</h1>
        <div>
            {ads.map((ad) => (
                <p key={ad.id}>
                    <strong>Title:</strong> {ad.title} <br />
                    <strong>Description:</strong> {ad.descr} <br />
                    <strong>Price:</strong> {ad.price} <br />
                    <strong>Posted:</strong> {ad.created_at}
                </p>
            ))}
        </div>
    </>
  )
}

export default App
