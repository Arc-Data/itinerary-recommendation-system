import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const TripSearchResults = ({searchData}) => {
    const displaySearchCard = searchData && searchData.map(location => {
        return (<div className="plan--search-result" key={location.id}> <FontAwesomeIcon className="search-location-icon" icon={faLocationDot} />{location.name}</div>)
    })

    return searchData === null ? null : (
        <div className="plan--search-input">
            {displaySearchCard}
        </div>
    )
}

export default TripSearchResults;