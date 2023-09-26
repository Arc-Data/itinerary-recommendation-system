import { useMemo, useState } from "react"
import LocationItem from "./LocationItem"
import TripSearchResults from "./TripSearchResult"
import dayjs from "dayjs"

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
            <p onClick={toggleOpen} className="">
                {dayjs(day.date).format("dddd, MMM D")} 
            </p>
            { open && 
            <>
            <div className="plan--itinerary-result">
                <p>Need help with your itinerary? Try our AI assistant</p>
                <button className="plan--ai-btn">AI Assistant</button>
            </div>

            {itineraryItems()}

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