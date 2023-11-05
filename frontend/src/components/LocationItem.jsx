import { faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import getTimeDetails from "../utils/getTimeDetails";
import getFeeDetails from "../utils/getFeeDetails";

const LocationItem = ({location, onClick}) => {
    const locationImage = {
        backgroundImage: `url(http://127.0.0.1:8000${location.details.primary_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const fee = getFeeDetails(location.details.min_cost, location.details.max_cost)
    const opening = getTimeDetails(location.details.opening)
    const closing = getTimeDetails(location.details.closing)

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