import { useEffect, useRef, useState } from "react"
import LocationItem from "./LocationItem"

const AddLocationModal = ({onClose, dayId, locations, setLocations}) => {
    const modalRef = useRef(null)
    const [searchData, setSearchData] = useState(null)
    const [openBookmarks, setOpenBookmarks] = useState(false)

    let debounceTimeout = 1500
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
                'day': dayId,
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
        return (
            <div key={location.id} location={location} className="add-location-modal--search-item">
                <p>{location.name}</p>
                <button onClick={() => handleClick(location.id)}>+</button>
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
                        />
                </div>
                {searchData !== null ? 
                <div className="add-location-modal--search">
                    {displaySearchItems}
                </div> : null}
            </div> 
            }
        </div>
        </>
    )
}

export default AddLocationModal