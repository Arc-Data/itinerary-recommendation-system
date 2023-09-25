import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LocationItem = () => {

    const locationImage = {
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/e/eb/Magellan%27s_Cross_in_Cebu.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <div className="plan--itinerary-item">
            <div className="plan--item">
                <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
                <div className="plan--location-details">
                    <p className="plan--location-name">Magellan's Cross</p>
                    <div>
                        <p>7WV2+CQG, P. Burgos St, Cebu City, 6000 Cebu</p>
                        <p>Open 6AM - 7PM</p>
                        <p>Entrance fee: Free</p>
                    </div>
                </div>
            </div>
            <div style={locationImage}></div>
        </div>
        // <div className="plan--itinerary-item">
        //     <FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
        //     <div>
        //         <p className="plan--location-name">Magellan's Cross</p>
        //         <div className="plan--location-details">
        //             <span>Historical Site • </span>
        //             <span>Free • </span>
        //             <span>8:00 AM</span>
        //         </div>
        //     </div>
        //     <img className="plan--location-img" src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Magellan%27s_Cross_in_Cebu.jpg" alt="" />
        // </div>
    )
}

export default LocationItem