import React from 'react'
import Modal from './Modal'

const ConfirmDelete = ({onClose, handleDelete}) => {
    return (
        <Modal onClose={onClose}>
            <div className="confirm-delete">
                <p className="confirm-delete--title">Deleting</p>
                <p className="confirm-delete--subtext">This action will delete the day, are you sure?</p>
                <div className="modal-btn--options">
                    <button onClick={onClose} className="modal-btn modal--cancel">Cancel</button>
                    <button onClick={handleDelete} className="modal-btn modal--delete">Delete</button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmDelete