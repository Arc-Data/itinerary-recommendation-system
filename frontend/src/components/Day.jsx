import { useContext, useState } from "react"
import LocationItem from "./LocationItem"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faChevronDown, faChevronUp, faBars } from "@fortawesome/free-solid-svg-icons";
import AddLocation from "./AddLocation";
import ConfirmDeleteItem from "./ConfirmDeleteItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import updateItemOrdering from "../utils/updateItemOrdering";
import AuthContext from "../context/AuthContext";

const Day = ({day, addMarker, includedLocations, setIncludedLocations}) => {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState(day.itinerary_items)
    const [openLocationModal, setLocationModal] = useState(false)
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [ordering, setOrdering] = useState(false)
    const [itemOrdering, setItemOrdering] = useState([])
    const { authTokens } = useContext(AuthContext)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    const toggleDeleteModal = (event, itemId) => {
        if(event) {
            event.stopPropagation()
        }

        setDeleteModal(prev => !prev)
        setSelectedItemId(itemId)
    }

    const toggleLocationModal = (event) => {
        if(event) {
            event.stopPropagation()
        }
        setLocationModal(prev => !prev)
    }

    const toggleOrdering = () => {
        const isOrderingActive = !ordering
        console.log(isOrderingActive) 
        setOrdering(prev => !prev)

        if(isOrderingActive) {
            const arr = [...items]
            setItemOrdering(arr)
        }
    }

    const itineraryItems = () => items.map(location => (
        <LocationItem 
            key={location.id} 
            location={location} 
            onClick={(e) => toggleDeleteModal(e, location.id)} />
        )
    )

    const onSaveOrdering = async () => {
        const items = [...itemOrdering]
        setItems(items)

        updateItemOrdering(authTokens, items)
        toggleOrdering()
    }

    const onDragEnd = (result) => {
        if(!result.destination) {
            return;
        }

        const reorderedItems = [...itemOrdering]
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1)
        reorderedItems.splice(result.destination.index, 0, reorderedItem)
    
        setItemOrdering(reorderedItems)
    }

    return (
        <div className="plan--itinerary">
            <p onClick={toggleOpen} className="plan--itinerary-day">
                {dayjs(day.date).format("dddd, MMM D")}
                <FontAwesomeIcon className="icon--chevron" icon={open ? faChevronUp : faChevronDown} size="2xs" />           
            </p>
            { open && 
            <>  
            { ordering ? (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="plan--order-container">
                                {itemOrdering.map((location, index) => (
                                    <Draggable 
                                        key={location.id}
                                        index={index}
                                        draggableId={location.id.toString()}>
                                    {(provided) => (
                                        <div 
                                            className="order-item"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <FontAwesomeIcon icon={faBars} />
                                            <p>{location.details.name}</p>
                                        </div>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                    )}
                </Droppable>
            </DragDropContext>
            )
            :
            <div className="plan--itinerary-items">
                {itineraryItems()}
            </div>
            }
            <div className="plan--btn-container">
                
                <div className="plan--btn-list">
                    {ordering ? 
                    <>
                        <button
                            onClick={toggleOrdering} 
                            className="plan--btn btn-secondary">
                            Cancel
                        </button>
                        <button
                            onClick={onSaveOrdering} 
                            className="plan--btn btn-primary">
                            Done
                        </button>
                    </>
                    :
                    <>
                        <button
                            onClick={toggleLocationModal} 
                            className="plan--btn btn-primary">
                            Add Location
                        </button>
                        <button className="plan--btn btn-secondary">
                            <span className="ai-assistant">AI Assistant</span>
                        </button>
                        <button className="btn-link" onClick={toggleOrdering}>Edit</button>
                    </>
                    }                    
                </div>
            </div>
            </>
            }
            {openLocationModal && 
            <AddLocation 
                onClose={toggleLocationModal} 
                locations={items}
                setLocations={setItems}
                day={day}
                includedLocations={includedLocations}
                setIncludedLocations={setIncludedLocations}
                addMarker={addMarker} />
            }
            {openDeleteModal && 
            <ConfirmDeleteItem 
                onClose={toggleDeleteModal}
                itemId={selectedItemId}
                locations={items}
                setLocations={setItems} 
                includedLocations={includedLocations}
                setIncludedLocations={setIncludedLocations}/>
            }
        </div>
    )
}

export default Day