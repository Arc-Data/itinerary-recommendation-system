import { useState } from "react"
import Modal from "./Modal"

const Color = ({onClose}) => {
    const [selectedColor, setSelectedColor] = useState()
    const colors = []

    return (
        <Modal onClose={onClose}>
            <div>
                Sample Modal
            </div>
        </Modal>
    )
}

export default Color