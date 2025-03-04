import Ad from "./Ad.jsx";

const AdList = ({adList, title}) => {

    if (!adList.length) {
        return <h1>No advertisements found.</h1>
    }

    return (
        <div className="ad-list">
            <h1>{title}</h1>
            {adList.map((ad, index) => (
                <div key={ad.index}>
                    <Ad key={ad.index} ad={ad} />
                </div>
            ))}
        </div>
    )
}

export default AdList;