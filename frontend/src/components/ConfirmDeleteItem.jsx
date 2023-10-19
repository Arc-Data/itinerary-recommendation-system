import Modal from "./Modal"

const ConfirmDeleteItem = ({onClose, itemId}) => {

    const handleDelete = () => {
        console.log("This action will delete", itemId)
    }

    return (
        <Modal onClose={onClose}>
            <div>
                <p className="confirm-delete--title">Deleting Item</p>
                <p className="confirm-delete--subtext">This action will delete the item, are you sure?</p>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleDelete}></button>
            </div>
        </Modal>
    )
}

export default ConfirmDeleteItem