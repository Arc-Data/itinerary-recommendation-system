import { useState } from "react";
import Modal from "./Modal"
import DatePicker from 'react-datepicker';

const DateSettings = ({onClose}) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [loading, setLoading] = useState(false)

    return (
        <Modal onClose={onClose}>
            <div>
                <p className="datesettings--modal-title">Trip Date</p>
                <div className="datesettings--container">
                    <div className="datesettings--input-group">
                        <label htmlFor="startDate">Start date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            className="datesettings--form-input"
                            startDate={startDate}
                            endDate={endDate}
                            isClearable
                        />
                    </div>
                    <div className="datesettings--input-group">
                        <label htmlFor="endDate">End date</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            className="datesettings--form-input"
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            isClearable
                        />

                    </div>
                </div>
                
                <button 
                    className="plan--btn btn-primary" 
                    disabled={!startDate || !endDate}>Save</button>
            </div>
        </Modal>
    )
}

export default DateSettings