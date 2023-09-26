import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"

const LocationItem = ({location}) => {

    const locationImage = {
        backgroundImage: `url(http://127.0.0.1:8000${location.details.primary_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const fee = location.details.max_cost === location.details.min_cost ?
        "Free" : `${location.details.min_cost} - ${location.details.max_cost}`;

    return (
        <div className="plan--itinerary-item">
            <div className="plan--item">
                <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
                <div className="plan--location-details">
                    <p className="plan--location-name">{location.details.name}</p>
                    <div>
                        <p>{location.details.address}</p>
                        <p>Open {location.details.opening} - {location.details.closing}</p>
                        <p>Entrance fee: {fee}</p>
                    </div>
                </div>
            </div>
            <div style={locationImage}></div>
        </div>
    )
}

export default LocationItem