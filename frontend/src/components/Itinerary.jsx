import { Link } from "react-router-dom"

const Itinerary = ({itinerary}) => {
    return (
        <div className="itinerary">
            <Link to ={`/plan/${itinerary.id}`}>
                <img 
                    src={`http://127.0.0.1:8000${itinerary.image}`} 
                    height={240}
                    width={240}
                    className="itinerary--image"
                    alt="" />
            </Link>
            <div>
                <p className="itinerary--location-name">{itinerary.title}</p>
                <p className="itinerary--location-date">{itinerary.trip_duration}</p>
            </div>
        </div>
    )
}

export default Itinerary