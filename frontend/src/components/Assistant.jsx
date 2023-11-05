import dayjs from "dayjs"

const Assistant = ({onClose, day}) => {
    const formatDate = (day) => {
        return dayjs(day.date).format("MMM D YYYY, dddd")
    }

    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="assistant">
                <div className="assistant--header">
                    <p className="assistant--header-title">AI Assistant</p>
                    <p>Use AI Assistant to generate your itinerary</p>
                </div>
                <div className="assistant--content">
                    <p>Choose 1 from the list genereated. Note that this will replace the itinerary you created in <span className="assistant--date">{formatDate(day.date)}</span>.</p>
                    <div className="assistant--content-grid">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assistant