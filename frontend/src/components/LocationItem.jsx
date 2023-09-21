import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LocationItem = () => {
    return (
        <div className="plan--itinerary-item">
            <FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
            <div>
                <p className="plan--location-name">Magellan's Cross</p>
                <div className="plan--location-details">
                    <span>Historical Site • </span>
                    <span>Free • </span>
                    <span>8:00 AM</span>
                </div>
            </div>
            <img className="plan--location-img" src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Magellan%27s_Cross_in_Cebu.jpg" alt="" />
        </div>
    )
}

export default LocationItem