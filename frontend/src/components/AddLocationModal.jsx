import { useEffect, useRef, useState } from "react"

const AddLocationModal = ({onClose}) => {
    const modalRef = useRef(null)
    console.log()

    const [openBookmarks, setOpenBookmarks] = useState(false)

    const toggleBookmarkSection = () => {
        setOpenBookmarks(prev => !prev)
    }

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
                        />
                </div>
            </div> 
            }
        </div>
        </>
    )
}

export default AddLocationModal