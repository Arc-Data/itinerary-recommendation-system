import { useState } from "react"
import LocationItem from "./LocationItem"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AddLocationModal from "./AddLocationModal";

const Day = ({day, includedLocations, setIncludedLocations}) => {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState(day.itinerary_items)
    const [openLocationModal, setLocationModal] = useState(false)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    const toggleLocationModal = (event) => {
        if(event) {
            event.stopPropagation()
        }
        setLocationModal(prev => !prev)
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
                    <button
                        onClick={toggleLocationModal} 
                        className="plan--btn btn-primary">
                        Add Location
                    </button>
                    <button className="plan--btn btn-secondary">
                        <span className="ai-assistant">AI Assistant</span>
                    </button>
                </div>
                <button className="btn-link">Edit</button>
            </div>
            </>
            }
            {openLocationModal && 
            <AddLocationModal 
                onClose={toggleLocationModal} 
                locations={items}
                setLocations={setItems}
                day={day}
                includedLocations={includedLocations}
                setIncludedLocations={setIncludedLocations}/>
            }
        </div>
    )
}

export default Day