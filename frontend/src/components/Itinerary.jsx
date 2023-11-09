import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClose, faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Itinerary = ({itinerary, onClick}) => {
    return (
        <div className="itinerary">
            <div className="itinerary--image-container">
                <Link to ={`/plan/${itinerary.id}`}>
                    <img 
                        src={`http://127.0.0.1:8000${itinerary.image}`} 
                        height={240}
                        width={270}
                        className="itinerary--image"
                        alt="" />
                </Link>
                <div className="itinerary--settings" onClick={() => onClick(itinerary.id)}>
                    <div className="itinerary--delete" >Delete</div>
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>
            <div>
                <p className="itinerary--title">{itinerary.name}</p>
                <div className="itinerary--details">
                    <FontAwesomeIcon icon={faCalendar} />
                    <p>{itinerary.trip_duration }</p>
                </div>
            </div>
        </div>
    )
}

export default Itinerary