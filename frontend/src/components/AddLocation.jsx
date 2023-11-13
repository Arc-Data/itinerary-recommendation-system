import { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Modal from "./Modal"
import getTimeDetails from "../utils/getTimeDetails"
import getFeeDetails from "../utils/getFeeDetails"
import useItemLocationManager from "../hooks/useItemLocationManager"

const AddLocation = ({onClose, locations, setLocations, day, includedLocations, setIncludedLocations, addMarker, deleteMarker}) => {
    const { authTokens } = useContext(AuthContext)
    const { addItem, deleteItem, updateItemOrdering } = useItemLocationManager(authTokens)
    const [recentlyAddedLocations, setRecentlyAddedLocations] = useState([])
    const [searchData, setSearchData] = useState(null)
    const [openBookmarks, setOpenBookmarks] = useState(false)
    const [searchString, setSearchString] = useState("")
    const [displayedSearchItems, setDisplayedSearchItems] = useState(null)

    let debounceTimeout = 2000;
    let timeout;

    const toggleBookmarkSection = () => {
        setOpenBookmarks(prev => !prev)
    }

    const searchLocations = async (search) => {
        const response = await fetch(`http://127.0.0.1:8000/api/location/?query=${search}&hide`)
        const data = await response.json()
        setSearchData(data)
    }

    const handleDeleteLocation = async (itemId, latitude, longitude) => {
        try {
            await deleteItem(itemId)
    
            const updatedLocations = locations.filter(i => i.id !== itemId)
            const updatedIncludedLocations = includedLocations.filter(i => i.id !== itemId)
            const updatedRecentlyAddedLocations = recentlyAddedLocations.filter(i => i.id !== itemId)
    
            setLocations(updatedLocations)
            setIncludedLocations(updatedIncludedLocations)
            setRecentlyAddedLocations(updatedRecentlyAddedLocations)
    
            updateItemOrdering(updatedLocations)
            deleteMarker(latitude, longitude)
        }
        catch (error) {
            console.log("An error occured: ", error)
        }
    }

    const handleAddLocation = async (locationId) => {
        try {
            const item = await addItem(locationId, day.id, locations.length)
            
            const arr1 = [...locations, item]
            const arr2 = [...includedLocations, item]
            const arr3 = [...recentlyAddedLocations, item]
            
            setLocations(arr1)
            setIncludedLocations(arr2)
            setRecentlyAddedLocations(arr3)

            addMarker(item.details.latitude, item.details.longitude, day.color)
        }
        catch(error) {
            console.log("An error occured : ", error)
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
        const status = includedLocations.some(i => {
            return i.location == locationId
        })

        return status
    }

    const displayRecentlyAdded = recentlyAddedLocations && recentlyAddedLocations.map(location => {
        return (
            <div key={location.id} location={location} className="add-location-modal--recently-added">
                <FontAwesomeIcon icon={faLocationDot} className="assistant--location-icon"/>
                <p>{location.details.name}</p>
                <div>
                    <FontAwesomeIcon 
                        icon={faClose} 
                        className="add-location-modal--remove"
                        onClick={() => handleDeleteLocation(location.id, location.details.latitude, location.details.longitude)}/>                
                </div>
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
                <div className="add-location-modal--recently-added-container">
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