import { useEffect, useState } from "react"
import LocationItem from "./LocationItem"
import TripSearchResults from "./TripSearchResult"

const Day = ({day}) => {
    const [open, setOpen] = useState(false)
    const [locations, setLocations] = useState([])
    const [searchData, setSearchData] = useState(null)
    
    // debounces search results by 3 seconds
    let debounceTimeout = 3000 
    let timeout;

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    const searchLocations = async (search) => {
        console.log(search)
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

    return (
        <div className="plan--itinerary">
            <div className="accordion-item">
                <div className="accordion-header" onClick={toggleOpen}>
                    {day.date} - Day of the Week
                </div>
                { open && 
                <div className="accordion-content">
                    <div className="plan--itinerary-result">
                        <p>Need help with your itinerary? Try our AI assistant</p>
                        <button className="plan--ai-btn">AI Assistant</button>
                    </div>
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
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
                            dayId={day.id} 
                            locations={locations} 
                            setLocations={setLocations} />
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Day