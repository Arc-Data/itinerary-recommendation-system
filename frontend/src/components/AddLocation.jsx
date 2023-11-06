import { useContext, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import AuthContext from "../context/AuthContext"
import Modal from "./Modal"
import updateItemOrdering from "../utils/updateItemOrdering"
import getTimeDetails from "../utils/getTimeDetails"
import getFeeDetails from "../utils/getFeeDetails"

const AddLocation = ({onClose, day, locations, setLocations, includedLocations, setIncludedLocations, addMarker, deleteMarker}) => {
    const { authTokens } = useContext(AuthContext)
    const [searchData, setSearchData] = useState(null)
    const [openBookmarks, setOpenBookmarks] = useState(false)
    const [searchString, setSearchString] = useState("")
    const [displayedSearchItems, setDisplayedSearchItems] = useState(null)
    const [recentlyAddedLocations, setRecentlyAddedLocations] = useState([])

    let debounceTimeout = 2000;
    let timeout;

    const toggleBookmarkSection = () => {
        setOpenBookmarks(prev => !prev)
    }

    const addLocation = (item) => {
        const arr1 = [...locations, item]
        const arr2 = [...includedLocations, item]
        const arr3 = [...recentlyAddedLocations, item]
        
        // adds the location for the current Day object to display
        setLocations(arr1)
        // adding the location for the add modal to keep track of all existing locations within all days
        // for duplicate finding 
        setIncludedLocations(arr2)
        // adding the location based on whether the user has added an item within the lifespan of the modal
        setRecentlyAddedLocations(arr3)
        addMarker(item.details.latitude, item.details.longitude, day.color)
    }

    const searchLocations = async (search) => {
        const response = await fetch(`http://127.0.0.1:8000/api/location/?query=${search}`)
        const data = await response.json()
        setSearchData(data)
    }

    const deleteLocation = (itemId, latitude, longitude) => {
        const updatedLocations = locations.filter(i => i.id !== itemId)
        const updatedIncludedLocations = includedLocations.filter(i => i.id !== itemId)
        const updatedRecentlyAddedLocations = recentlyAddedLocations.filter(i => i.id !== itemId)

        setLocations(updatedLocations)
        setIncludedLocations(updatedIncludedLocations)
        setRecentlyAddedLocations(updatedRecentlyAddedLocations)

        updateItemOrdering(authTokens, updatedLocations)
        deleteMarker(latitude, longitude)
    }

    const handleDeleteLocation = async (itemId, location) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/day-item/${itemId}/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${String(authTokens.access)}`,
                }
            })

            if(!response.ok) {
                throw new Error('Something happened')
            }
            
            deleteLocation(itemId, location.details.latitude, location.details.longitude)
        }
        catch (error) {
            console.log("Errror While Deleting Itinerary Item: ", error)
        }
    }

    const handleAddLocation = async (locationId) => {
        try {
            const requestBody = {
                'location': locationId,
                'day': day.id,
                'order': locations.length
            }

            const response = await fetch("http://127.0.0.1:8000/api/day-item/", {
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
            addLocation(item)
        }
        catch (error) {
            console.log("Error. " + error)
        }

    }

    const handleChange = (e) => {
        clearTimeout(timeout)
        setSearchString(e.target.value)

        if(searchString.length === 0) {
            setSearchData(null)
            setDisplayedSearchItems(null)
            return
        }
        
        timeout = setTimeout(() => {
            searchLocations(e.target.value)
        }, debounceTimeout)
    }

    const checkDuplicateLocation = (locationId) => {
        return includedLocations.some(i => i.location == locationId)
    }

    const displayRecentlyAdded = recentlyAddedLocations && recentlyAddedLocations.map(location => {
        const name = location.details.name
        const address = location.details.address
        const fee = getFeeDetails(location.details.min_cost, location.details.max_cost)
        const opening_time = getTimeDetails(location.details.opening)
        const closing_time = getTimeDetails(location.details.closing) 
        
        return (
            <div key={location.id} location={location} className="add-location-modal--search-item">
                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                <div>
                    <Link to={`/location/${location.id}`}>
                    <p className="add-location-modal--title">{name}</p>
                    </Link>
                    <p className="add-location-modal--subtext">{address}</p>
                    <p className="add-location-modal--subtext"><span>Opens {opening_time} - {closing_time} </span>•<span> Entrance Fee: {fee} </span></p>
                </div>
                <button className="add-location-modal--add-btn" onClick={() => handleDeleteLocation(location.id, location)}>x</button>
            </div>
        )
    })

    useEffect(() => {
        if (searchData) {
            const results = searchData.map(location => {
                const fee = getFeeDetails(location.fee.min, location.fee.max)
                const opening_time = getTimeDetails(location.schedule.opening)
                const closing_time = getTimeDetails(location.schedule.closing) 
                return !checkDuplicateLocation(location.id) && (
                    <div key={location.id} location={location} className="add-location-modal--search-item">
                        <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                        <div>
                            <Link to={`/location/${location.id}`}>
                            <p className="add-location-modal--title">{location.name}</p>
                            </Link>
                            <p className="add-location-modal--subtext">{location.address}</p>
                            <p className="add-location-modal--subtext"><span>Opens {opening_time} - {closing_time} </span>•<span> Entrance Fee: {fee} </span></p>
                        </div>
                        <button className="add-location-modal--add-btn" onClick={() => handleAddLocation(location.id)}>+</button>
                    </div>
                )
            })
            setDisplayedSearchItems(results)
               
        }

    }, [searchData, recentlyAddedLocations])

    return (
        <Modal onClose={onClose}>
            <div className="add-location-modal--tabs">
                <div className={`${openBookmarks ? "" : "active"}` } onClick={toggleBookmarkSection}>Location</div>
                <div className={`${openBookmarks ? "active" : ""}`} onClick={toggleBookmarkSection}>Bookmarks</div>
            </div>
            {openBookmarks ?
            <div>
                <div className="add-location-modal--content">
                Bookmarks
                </div>
            </div> 
            : 
            <div className="add-location-modal--content">
                <input 
                    type="search"
                    placeholder="Add a location"
                    name="location"
                    id="location"
                    className="plan--search-input add-location--search-input"
                    onChange={handleChange}
                    value={searchString}
                    />
                {recentlyAddedLocations.length !== 0 && 
                <div>
                    {displayRecentlyAdded}
                </div> }
                {searchString.length !== 0 ? 
                <div className="add-location-modal--results-container">
                    <p>Search Results for "{searchString}"</p>
                    <div className="add-location-modal--results">
                        {displayedSearchItems}
                    </div> 
                </div> : null}
            </div>
            }
        </Modal>
    )
}

export default AddLocation