import { useContext } from "react"
import Modal from "./Modal"
import AuthContext from "../context/AuthContext"
import useItemLocationManager from "../hooks/useItemLocationManager"

const ConfirmDeleteItem = ({onClose, itemId, deleteMarker, locations, setLocations, includedLocations, setIncludedLocations, setItemOrdering}) => {
    const { authTokens } = useContext(AuthContext)
    const { deleteItem, updateItemOrdering } = useItemLocationManager(authTokens)

    const handleDelete = async () => {
        try {
            await deleteItem(itemId)

            const item = locations.find(i => i.id == itemId)

            const updatedLocations = locations.filter(i => i.id !== itemId)
            const updatedIncludedLocations = includedLocations.filter(i => i.id !== itemId)
    
            setLocations(updatedLocations)
            setIncludedLocations(updatedIncludedLocations)
            
            updateItemOrdering(updatedLocations)
            setItemOrdering(updatedLocations)

            deleteMarker(item.details.latitude, item.details.longitude)
            onClose()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="confirm-delete">
                <p className="confirm-delete--title">Deleting Item</p>
                <p className="confirm-delete--subtext">This action will delete the item, are you sure?</p>
                <div className="modal-btn--options">
                    <button onClick={onClose} className="modal-btn modal--cancel">Cancel</button>
                    <button onClick={handleDelete} className="modal-btn modal--delete">Delete</button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmDeleteItem