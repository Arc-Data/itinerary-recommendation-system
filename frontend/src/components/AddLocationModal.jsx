import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

const AddLocationModal = ({onClose, day, locations, setLocations}) => {
    const modalRef = useRef(null)
    const [searchData, setSearchData] = useState(null)
    const [openBookmarks, setOpenBookmarks] = useState(false)
    const [searchString, setSearchString] = useState("")

    let debounceTimeout = 1500;
    let timeout;

    const toggleBookmarkSection = () => {
        setOpenBookmarks(prev => !prev)
    }

    const addLocation = (item) => {
        const arr = [...locations]
        arr.push(item)
        setLocations(arr)
    }

    const searchLocations = async (search) => {
        const response = await fetch(`http://127.0.0.1:8000/api/location/?query=${search}`)
        const data = await response.json()
        setSearchData(data)
        console.log(searchData)
    }

    const handleClick = async (locationId) => {
        try {
            const requestBody = {
                'location': locationId,
                'day': day.id,
            }

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
            addLocation(item)
            
        }
        catch (error) {
            console.log("Error. " + error)
        }

        setSearchData(null)
    }

    const handleChange = (e) => {
        const searchQuery = e.target.value;
        setSearchString(searchQuery)

        if(!searchQuery) {
            setSearchData(null)
            return
        }

        clearTimeout(timeout)
        timeout = setTimeout(() => {
            searchLocations(searchQuery)
        }, debounceTimeout)
    }

    const displaySearchItems = searchData && searchData.map(location => {
        const fee = location.fee.min === 0 ? 
            "Free" : location.fee.min === location.fee.max ? location.fee.min : `${location.fee.min} - ${location.fee.max}`;

        const opening_string = location.schedule.opening.split(":")
        const closing_string = location.schedule.closing.split(":")
        const opening = dayjs(new Date(2045, 1, 1, ...opening_string)).format('h:mm A')
        const closing = dayjs(new Date(2045, 1, 1, ...closing_string)).format('h:mm A')

        return (
            <div key={location.id} location={location} className="add-location-modal--search-item">
                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                <div>
                    <Link to={`/location/${location.id}`}>
                    <p className="add-location-modal--title">{location.name}</p>
                    </Link>
                    <p className="add-location-modal--subtext">{location.address}</p>
                    <p className="add-location-modal--subtext"><span>Opens {opening} - {closing} </span>•<span> Entrance Fee: {fee} </span></p>
                </div>
                <button className="add-location-modal--add-btn" onClick={() => handleClick(location.id)}>+</button>
            </div>
        )
    })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(!modalRef.current.contains(event.target)) {
                onClose()
            }
        }
        document.body.addEventListener("click", handleClickOutside)
        
        return () => {
            document.body.removeEventListener("click", handleClickOutside)
        }
    }, [onClose])

    return (
        <>
        <div className="overlay"></div>
        <div ref={modalRef} className="add-location-modal">
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
            <div>
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
                </div>
                {searchData !== null ? 
                <div className="add-location-modal--results-container">
                    <p>Search Results for "{searchString}"</p>
                    <div className="add-location-modal--results">
                        {displaySearchItems}
                    </div> 
                </div> : null}
            </div> 
            }
        </div>
        </>
    )
}

export default AddLocationModal