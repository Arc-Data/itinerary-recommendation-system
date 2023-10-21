import { faBars } from "@fortawesome/free-solid-svg-icons"
import { Draggable } from "react-beautiful-dnd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OrderItem = ({location, index}) => {
    const draggableId = `location-${location.id}`;
    console.log(location)
    // Outputs
    // day: 12
    // details: {
        // address:"Lot 2-A-3, Brgy. Gabi, Cordova, 6007"
        // closing:"20:00:00"
        // name: "Cebu Happy World Museum"
        // primary_image:"/media/location_images/Cebu_Happy_World_Museum/Cebu_Happy_World_Museum.jpg"
    // }
    // id:106
    // location:626

    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => (
            <div 
                className="order-item"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >
                <FontAwesomeIcon icon={faBars} />
                <p>{location.details.name}</p>
            </div>
            )}
        </Draggable>
    )
}

export default OrderItem