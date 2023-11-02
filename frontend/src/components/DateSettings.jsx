import { useState } from "react";
import Modal from "./Modal"
import DatePicker from 'react-datepicker';

const DateSettings = ({onClose}) => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    return (
        <Modal onClose={onClose}>
            <div className="datesettings--modal">
                <p class="datesettings--modal-title">Trip Date</p>
                <form>
                    <div className="datesettings--container">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        className="datesettings--form-input"
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        className="datesettings--form-input"

                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                    </div>
                    <button className="plan--btn">Save</button>
                </form>
            </div>
        </Modal>
    )
}

export default DateSettings