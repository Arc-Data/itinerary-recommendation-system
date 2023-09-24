import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const TripSearchResults = ({searchData, dayId, locations, setLocations}) => {
    const addLocation = (item) => {
        const arr = [...locations]
        arr.push(item)
        setLocations(arr)
    }
    
    const handleClick = async (locationId) => {
        try {
            const requestBody = {
                'location': locationId,
                'day': dayId,
            }

            console.log(requestBody)

            const response = await fetch("http://127.0.0.1:8000/api/day-item", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(requestBody)
            })


            if (!response.ok) {
                console.log("Itinerary Item Creation Failed")
                return
            }

            const item = await response.json()
            console.log(item)
            addLocation(item)
        }
        catch (error) {
            console.log("Something went wrong. " + error)
        }
    }

    const displaySearchCard = searchData && searchData.map(location => {
        return (
            <div className="plan--search-result" key={location.id} onClick={() => handleClick(location.id)}> 
                <FontAwesomeIcon className="search-location-icon" icon={faLocationDot} /> {location.name}
            </div>
        )
    })

    return searchData === null ? null : (
        <div className="plan--search-input">
            {displaySearchCard}
        </div>
    )
}

export default TripSearchResults;