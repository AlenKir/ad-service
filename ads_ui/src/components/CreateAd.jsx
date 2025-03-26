import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdService from "../API/AdService.js";
import styles from "./CreateAd.module.css";

const CreateAd = () => {
    const [title, setTitle] = useState("");
    const [descr, setDescr] = useState("");
    const [body, setBody] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AdService.createAd({ title, descr, body, price });
            navigate("/");
        } catch (error) {
            console.error("Error creating ad", error);
        }
    };

    return (
        <div className={styles.createAd}>
            <h1>Place a new advert:</h1>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateAd;