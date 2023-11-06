import { useState } from "react"
import Modal from "./Modal"

const Color = ({onClose, day, updateDays}) => {
    const [selectedColor, setSelectedColor] = useState()
    const colors = ['#184E77', '#38A3A5', '#57CC99', '#80ED99', '#C7F9CC', '#5FD9F3']

    const handleSubmit = async (e) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/day/${day.id}/color/`, {
                "method": "POST",
                "headers": {
                    'Content-Type': "application/json",
                },
                "body": JSON.stringify({
                    "color": selectedColor
                })
            })

            const data = await response.json()
            
            updateDays(day.id, data.day)
        }
        catch (error) {
            console.log("An error occured: ", error)
        }

        onClose()
    }

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
                    <button 
                        className="assistant--btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button 
                        onClick={handleSubmit}
                        disabled={!selectedColor}
                        className="assistant--btn btn-primary">Done</button>
                </div>
            </div>
        </Modal>
    )
}

export default Color