import { faClock, faLocationDot, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import getTimeDetails from "../utils/getTimeDetails";
import getFeeDetails from "../utils/getFeeDetails";

const LocationItem = ({location}) => {
    
    const string = `http://127.0.0.1:8000${location.details.primary_image.replace(/'/g, "\\'")}` 

    const locationImage = {
        backgroundImage: `url(${string})`,
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
                        <p><FontAwesomeIcon icon={faClock} /> {opening} - {closing}</p>
                        <p><span className="plan--location-detail">Entrance fee:</span> {fee}</p>
                    </div>
                </div>
            </div>
            <div style={locationImage}></div>
        </div>
    )
}

export default LocationItem