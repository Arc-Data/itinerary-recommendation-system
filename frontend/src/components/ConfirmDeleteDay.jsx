import { useContext } from "react"
import Modal from "./Modal"
import AuthContext from "../context/AuthContext"
import useDayManager from "../hooks/useDayManager"

const ConfirmDeleteDay = ({onClose, removeDay, dayId}) => {
    const { authTokens } = useContext(AuthContext)
    const { deleteDay } = useDayManager(authTokens)

    const handleDelete = async () => {
        try {
            await deleteDay(dayId)
            removeDay(dayId)
        }
        catch(error){
            console.log("An error occured: ", error)
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="confirm-delete">
                <p className="confirm-delete--title">Deleting Day</p>
                <p className="confirm-delete--subtext">This action will delete the day, are you sure?</p>
                <div className="modal-btn--options">
                    <button onClick={onClose} className="modal-btn modal--cancel">Cancel</button>
                    <button onClick={handleDelete} className="modal-btn modal--delete">Delete</button>
                </div>
            </div>
        </Modal>      
    )
}

export default ConfirmDeleteDay