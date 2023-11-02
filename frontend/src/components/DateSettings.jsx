import Modal from "./Modal"

const DateSettings = ({onClose}) => {
    console.log("Shouldnt this be rendering actually")

    return (
        <Modal onClose={onClose}>
            <div>Something</div>
        </Modal>
    )
}

export default DateSettings