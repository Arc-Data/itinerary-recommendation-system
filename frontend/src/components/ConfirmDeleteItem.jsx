import { useContext } from "react"
import Modal from "./Modal"
import AuthContext from "../context/AuthContext"

const ConfirmDeleteItem = ({onClose, itemId, locations, setLocations, includedLocations, setIncludedLocations}) => {
    const { authTokens } = useContext(AuthContext)
    console.log(locations)
    console.log(includedLocations)

    const deleteItem = () => {
        console.log("Deleting item")


        const updatedLocations = locations.filter(i => i.id !== itemId)
        const updatedIncludedLocations = includedLocations.filter(i => i.id !== itemId)

        setLocations(updatedLocations)
        setIncludedLocations(updatedIncludedLocations)
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/day-item/${itemId}/delete`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${String(authTokens.access)}`,
                }
            })

            if(!response.ok) {
                throw new Error("Something happened")
            }

            deleteItem(itemId)
            onClose()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal onClose={onClose}>
            <div>
                <p className="confirm-delete--title">Deleting Item</p>
                <p className="confirm-delete--subtext">This action will delete the item, are you sure?</p>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </Modal>
    )
}

export default ConfirmDeleteItem