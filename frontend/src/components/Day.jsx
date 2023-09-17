import { useState } from "react"

const Day = ({day}) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className="day">
            <div className="day--header" onClick={toggleOpen}>{day.date}</div>
            { open && 
            <div>
                Hello World
            </div>
            }
        </div>
    )
}

export default Day