import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClose, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ConfirmDelete from "../components/ConfirmDelete";

const Itinerary = ({itinerary, handleDelete}) => {
    const [ openDelete, setOpenDelete ] = useState(false) 
    
    const toggleDeleteModal = (e) => {
        if (e) {
            e.stopPropagation()
        }

        setOpenDelete(prev => !prev)
    }

    const confirmDelete = () => {
        handleDelete(itinerary.id)
        toggleDeleteModal()
    }

    return (
        <div className="itinerary">
            <div className="itinerary--image-container">
                <Link to ={`/plan/${itinerary.id}`}>
                    <img 
                        src={`http://127.0.0.1:8000${itinerary.image}`} 
                        height={240}
                        width={270}
                        className="itinerary--image"
                        alt="" />
                </Link>
                <div className="itinerary--settings" onClick={toggleDeleteModal}>
                    <div className="itinerary--delete" >Delete</div>
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>
            <div>
                <p className="itinerary--title">{itinerary.name}</p>
                <div className="itinerary--details">
                    <FontAwesomeIcon icon={faCalendar} />
                    <p>{itinerary.trip_duration }</p>
                </div>
            </div>
            {openDelete && 
            <ConfirmDelete 
                onClose={toggleDeleteModal}
                handleDelete={confirmDelete}
                />}
        </div>
    )
}

export default Itinerary