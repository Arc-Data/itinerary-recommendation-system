import { faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs";

const LocationItem = ({location, onClick}) => {
    const locationImage = {
        backgroundImage: `url(http://127.0.0.1:8000${location.details.primary_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const fee = location.details.max_cost === "0" ?  
        "Free" : location.details.max_cost === location.details.min_cost ?
        location.details.min_cost : `${location.details.min_cost} - ${location.details.max_cost}`;

    const opening_string = location.details.opening.split(":")
    const closing_string = location.details.closing.split(":")
    const opening = dayjs(new Date(2045, 1, 1, ...opening_string)).format("h:mm A")
    const closing = dayjs(new Date(2045, 1, 1, ...closing_string)).format("h:mm A")

    return (
        <div className="plan--itinerary-item">
            <div className="plan--item">
                <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
                <div className="plan--location-details">
                    <p className="plan--location-name">{location.details.name}</p>
                    <div>
                        <p>Opens {opening} - {closing}</p>
                        <p>Entrance fee: {fee}</p>
                    </div>
                </div>
                <div className="plan--location-settings" onClick={onClick}>
                    <span>Delete</span> 
                    <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                </div>
            </div>
            <div style={locationImage}></div>
        </div>
    )
}

export default LocationItem