import { useMemo, useState } from "react"
import LocationItem from "./LocationItem"
import TripSearchResults from "./TripSearchResult"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


const Day = ({day}) => {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState(day.itinerary_items)
    const [searchData, setSearchData] = useState(null)

    // debounces search results by 2 seconds
    let debounceTimeout = 2000 
    let timeout;

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    const searchLocations = async (search) => {
        const response = await fetch(`http://127.0.0.1:8000/api/location/?query=${search}`)
        const data = await response.json()
        setSearchData(data)
    }

    const handleChange = (e) => {
        const searchQuery = e.target.value;

        if(!searchQuery) {
            setSearchData(null)
            return;
        }

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            searchLocations(searchQuery)
        }, debounceTimeout)
    }

    const itineraryItems = () => {
        return items.map(location => {
            return (<LocationItem key={location.id} location={location}/>)
        })
    }

    return (
        <div className="plan--itinerary">
            <p onClick={toggleOpen} className="plan--itinerary-day">
                {dayjs(day.date).format("dddd, MMM D")}
                <FontAwesomeIcon className="icon--chevron" icon={open ? faChevronUp : faChevronDown} size="2xs" />           
            </p>
            { open && 
            <>  
                <div className="plan--itinerary-items">
                {itineraryItems()}
                </div>
                <div className="plan--btn-container">
                    <div className="plan--btn-list">
                        <button className="plan--btn btn-primary">Add Location</button>
                        <button className="plan--btn btn-secondary">
                            <span className="ai-assistant">AI Assistant</span>
                        </button>
                    </div>
                    <button className="btn-link">Edit</button>
                </div>

                <div className="plan--search">
                    <input 
                        type="search"
                        placeholder="Add a location"
                        name="location"
                        id="location"
                        className="plan--search-input"
                        onChange={handleChange}
                    />
                    <TripSearchResults 
                        searchData={searchData}
                        setSearchData={setSearchData} 
                        dayId={day.id} 
                        locations={items} 
                        setLocations={setItems} />
                </div>
            </>
            }
        </div>
    )
}

export default Day