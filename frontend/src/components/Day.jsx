import { useState } from "react"
import LocationItem from "./LocationItem"

const Day = ({day}) => {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className="plan--itinerary">
            <div className="accordion-item">
                <div className="accordion-header" onClick={toggleOpen}>
                    {day.date} - Day of the Week
                </div>
                { open && 
                <div className="accordion-content">
                    <div className="plan--itinerary-result">
                        <p>Need help with your itinerary? Try our AI assistant</p>
                        <button className="plan--ai-btn">AI Assistant</button>
                    </div>
                    
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />

                    <div>
                        <input 
                            type="text"
                            placeholder="Add a location"
                            name="location"
                            id="location"
                        />
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Day