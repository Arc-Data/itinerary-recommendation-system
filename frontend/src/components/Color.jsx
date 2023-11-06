import { useState } from "react"
import Modal from "./Modal"

const Color = ({onClose}) => {
    const [selectedColor, setSelectedColor] = useState()
    const colors = ['#184E77', '#38A3A5', '#57CC99', '#80ED99', '#C7F9CC', '#5FD9F3']

    return (
        <Modal onClose={onClose}>
            <div className="color--modal">
                <p>Pick a color</p>
                <div className="color--selection">
                    {colors.map((color, idx) => {
                        const style = {
                            'backgroundColor': color,
                            'border': `${selectedColor === color ? "2px solid black" : ""} `
                        }
                        
                        return (
                        <div
                            key={idx} 
                            name={color}
                            style={style}
                            onClick={() => setSelectedColor(color)}
                            className="color--selection-item"></div>
                        )
                    })}
                </div>
                <div>
                    <button className="assistant--btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="assistant--btn btn-primary">Done</button>
                </div>
            </div>
        </Modal>
    )
}

export default Color