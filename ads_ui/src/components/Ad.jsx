const Ad = (props) => {
    return (
        <div className="ad">
            <div className="ad__header">{props.ad.title} {props.ad.price}€</div>
            <div className="ad__body">
                {props.ad.descr}
            </div>
            <div className="ad__footer">
                {props.ad.created_at}
            </div>
        </div>
    )
}
export default Ad;