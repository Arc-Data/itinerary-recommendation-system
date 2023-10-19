import { useState } from "react"
import LocationItem from "./LocationItem"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faChevronDown, faChevronUp, faBars } from "@fortawesome/free-solid-svg-icons";
import AddLocation from "./AddLocation";
import ConfirmDeleteItem from "./ConfirmDeleteItem";
import OrderItem from "./OrderItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Day = ({day, includedLocations, setIncludedLocations}) => {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState(day.itinerary_items)
    const [openLocationModal, setLocationModal] = useState(false)
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [ordering, setOrdering] = useState(false)

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
        setOrdering(prev => !prev)
    }

    const itineraryItems = () => items.map(location => (
        <LocationItem 
            key={location.id} 
            location={location} 
            onClick={(e) => toggleDeleteModal(e, location.id)} />
        )
    )

    const onDragEnd = (result) => {
        if(!result.destination) {
            return;
        }

        const reorderedItems = [...items]
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1)
        reorderedItems.splice(result.destination.index, 0, reorderedItem)
    
        setItems(reorderedItems)
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
                                {items.map((location, index) => (
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
                    <button
                        onClick={toggleLocationModal} 
                        className="plan--btn btn-primary">
                        Add Location
                    </button>
                    <button className="plan--btn btn-secondary">
                        <span className="ai-assistant">AI Assistant</span>
                    </button>
                </div>
                <button className="btn-link" onClick={toggleOrdering}>Edit</button>
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
                setIncludedLocations={setIncludedLocations}/>
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