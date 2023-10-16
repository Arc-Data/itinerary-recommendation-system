import { Link } from "react-router-dom"

const Itinerary = ({itinerary}) => {
    return (
        <div className="itinerary">
            <Link to ={`/plan/${itinerary.id}`}>
                <img 
                    src={`http://127.0.0.1:8000${itinerary.image}`} 
                    height={245}
                    width={222}
                    className="itinerary--image"
                    alt="" />
            </Link>
            <div>
                <p className="itinerary--location-name">Insert Location Name</p>
                <p className="itinerary--location-date">Insert Random Date</p>
            </div>
        </div>
    )
}

export default Itinerary