import { useContext, useEffect, useState } from "react"
import LocationItem from "./LocationItem"
import dayjs from "dayjs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles, faChevronDown, faChevronUp, faBars, faPlus, faDotCircle, faCircle, faEllipsis, faPalette, faEdit, faRemove, faTrash, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import AddLocation from "./AddLocation";
import ConfirmDeleteItem from "./ConfirmDeleteItem";
import { DragDropContext,  Draggable } from "react-beautiful-dnd";
import updateItemOrdering from "../utils/updateItemOrdering";
import AuthContext from "../context/AuthContext";
import StrictModeDroppable from "../components/StrictModeDroppable"
import Assistant from "./Assistant";
import Color from "./Color";

const Day = ({
    day, updateDays, addMarker, 
    deleteMarker, includedLocations, setIncludedLocations}) => {

    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([])
    const [openLocationModal, setLocationModal] = useState(false)
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [openAssistantModal, setAssistantModal] = useState(false)
    const [openDaySettings, setOpenDaySettings] = useState(false)
    const [openColorModal, setOpenColorModal] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [ordering, setOrdering] = useState(false)
    const [itemOrdering, setItemOrdering] = useState([])

    const [minTotal, setMinTotal] = useState(0)
    const [maxTotal, setMaxTotal] = useState(0)

    const { authTokens } = useContext(AuthContext)

    useEffect(() => {
        setItems(day.itinerary_items)
    }, [day])

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

    const toggleAssistantModal = (event) => {
        if(event) {
            event.stopPropagation()
        }
        setAssistantModal(prev => !prev)
    }

    const toggleOpenColorModal = (event) => {
        if(event) {
            event.stopPropagation()
        }
        setOpenDaySettings(false)
        setOpenColorModal(prev => !prev)
    }

    const toggleOrdering = () => {
        const isOrderingActive = !ordering
        setOrdering(prev => !prev)

        if(isOrderingActive) {
            const arr = [...items]
            setItemOrdering(arr)
        }
    }

    const itineraryItems = () => items.map(location => {
        return (
            <LocationItem 
                key={location.id} 
                location={location} 
                onClick={(e) => toggleDeleteModal(e, location.id)} />
        )
    })

    const preventSettingsPropagation = (e) => {
        e.stopPropagation()
    }

    const toggleDaySettingsClick = () => {
        setOpenDaySettings(prev => !prev)
    }

    const moveItemUp = (index) => {
        if (index === 0) return;
    
        const reorderedItems = [...itemOrdering];
        const temp = reorderedItems[index];
        reorderedItems[index] = reorderedItems[index - 1];
        reorderedItems[index - 1] = temp;
    
        setItemOrdering(reorderedItems);
    };
    
    const moveItemDown = (index) => {
        if (index === items.length - 1) return;
    
        const reorderedItems = [...itemOrdering];
        const temp = reorderedItems[index];
        reorderedItems[index] = reorderedItems[index + 1];
        reorderedItems[index + 1] = temp;
    
        setItemOrdering(reorderedItems);
    };

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

    useEffect(() => {
        let min = items.reduce((total, item) => item.details.min_cost + total, 0)
        let max = items.reduce((total, item) => item.details.max_cost + total, 0)
        
        setMinTotal(min)
        setMaxTotal(max)
    }, [items])

    return (
        <div className="plan--itinerary">
            <div onClick={toggleOpen} className="plan--itinerary-day">
                <p>
                    <FontAwesomeIcon className="icon--chevron" icon={open ? faChevronUp : faChevronDown} size="2xs" />           
                    <span>{dayjs(day.date).format("dddd, MMM D")}</span>
                </p>
                <div className="plan--day-settings" onClick={preventSettingsPropagation}>
                    <FontAwesomeIcon icon={faEllipsis} onClick={toggleDaySettingsClick}/>
                    { openDaySettings && 
                    <div className="plan--day-dropcontent"> 
                        <div className="plan--day-dropcontent-item">
                            <FontAwesomeIcon icon={faRemove} />
                            <p>Delete day</p>
                        </div>
                        <div className="plan--day-dropcontent-item" onClick={toggleOpenColorModal}>
                            <FontAwesomeIcon icon={faPalette} />
                            <p>Edit color</p>
                        </div>
                    </div>
                    }
                </div>
            </div>
            
            { open && 
            <>  

            { ordering ? (
            <DragDropContext onDragEnd={onDragEnd}>
                <StrictModeDroppable droppableId="droppable">
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="plan--order-container">
                                {items.length !== 0 && 
                                <p>
                                    <span>Total places: {items.length} </span>
                                    <span>Cost estimate: {minTotal} - {maxTotal} PHP</span>
                                </p>
                                }
                                <p>Drag the items around to influence their ordering.</p>
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
                                            <FontAwesomeIcon icon={faLocationDot} className="assistant--location-icon"/>
                                            <p>{location.details.name}</p>
                                            <div className="order-icons">
                                                <div className="order-icon" onClick={() => moveItemUp(index)}>
                                                    <FontAwesomeIcon icon={faChevronUp} />
                                                </div>
                                                <div className="order-icon" onClick={() => moveItemDown(index)}>
                                                    <FontAwesomeIcon icon={faChevronDown} />
                                                </div>
                                                <div className="order-icon" onClick={(e) => toggleDeleteModal(e, location.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
            )
            :
            <div className="plan--itinerary-items">
                {items.length !== 0 && 
                <p>
                    <span>Total places: {items.length} </span>
                    <span>Cost estimate: {minTotal} - {maxTotal} PHP</span>
                </p>
                }
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
                            <span><FontAwesomeIcon icon={faPlus}/>Add Location</span>
                        </button>
                        <button 
                            onClick={toggleAssistantModal}
                            className="plan--btn btn-secondary">
                            <span className="ai-assistant"><FontAwesomeIcon icon={faWandMagicSparkles}/>AI Assistant</span>
                        </button>
                        {items &&
                        <button className="btn-link" onClick={toggleOrdering}>Edit</button>
                        }
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
                addMarker={addMarker} 
                deleteMarker={deleteMarker}/>
            }
            {openDeleteModal && 
            <ConfirmDeleteItem 
                onClose={toggleDeleteModal}
                itemId={selectedItemId}
                deleteMarker={deleteMarker}
                locations={items}
                setLocations={setItems} 
                includedLocations={includedLocations}
                setIncludedLocations={setIncludedLocations}
                setItemOrdering={setItemOrdering}/>
            }
            {openAssistantModal &&
            <Assistant 
                onClose={toggleAssistantModal}
                day={day}
                updateDays={updateDays}/>
            }
            {openColorModal &&
            <Color 
                onClose={toggleOpenColorModal}
                day={day}
                updateDays={updateDays}/>
            }
        </div>
    )
}

export default Day