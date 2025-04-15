import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdService from "../../API/AdService.js";
import styles from "./AdForm.module.css";

const AdForm = () => {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [body, setBody] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchAd = async () => {
                try {
                    const res = await AdService.fetchAdDetails(id);
                    const ad = res.data;
                    setTitle(ad.title || "");
                    setDescr(ad.descr || "");
                    setBody(ad.body || "");
                    setPrice(ad.price || "");
                } catch (err) {
                    console.error("Failed to load ad", err);
                }
            };
            fetchAd();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        ['title', 'descr', 'body', 'price'].forEach(field => formData.append(field, eval(field)));
        images.forEach(image => formData.append("photos", image));

        try {
            if (id) {
                await AdService.updateAd(id, formData);
                navigate(`/ads/${id}`);
            } else {
                await AdService.createAd(formData);
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting ad", error);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(Array.from(files));
    };

    return (
        <div className={styles.adForm}>
            <h1>{id ? "Edit Advertisement" : "Place a New Advert"}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={200}
                />
                <textarea
                    placeholder="Headline"
                    value={descr}
                    onChange={(e) => setDescr(e.target.value)}
                    required
                    maxLength={500}
                    rows={1}
                ></textarea>
                <textarea
                    placeholder="Details"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    maxLength={5000}
                    rows={10}
                ></textarea>
                <input
                    type="number"
                    placeholder="Price (€)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    step="0.01"
                    min="0"
                    max="1000000"
                />
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <button type="submit">{id ? "Update Ad" : "Submit"}</button>
            </form>
        </div>
    );
};

export default AdForm;