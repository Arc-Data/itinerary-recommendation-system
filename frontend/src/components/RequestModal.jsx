import Modal from "../components/Modal"

const RequestModal = ({onClose, id}) => {
    return (
        <Modal onClose={onClose}>
            Hello {id}
        </Modal>
    )
}

export default RequestModal