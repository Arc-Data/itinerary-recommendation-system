import Modal from "../components/Modal"

const RequestModal = ({onClose, request}) => {
    console.log(request)

    return (
        <Modal onClose={onClose}>
            <button>Approve</button>
            <button>Reject</button>
            <button>Cancel</button>
        </Modal>
    )
}

export default RequestModal