import { faLocation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import getTimeDetails from "../utils/getTimeDetails"
import getFeeDetails from "../utils/getFeeDetails"

const Recommendation = ({recommendation}) => {
    
    const displayItem = recommendation && recommendation.locations.map(item => {
        return (
            <div key={item.id} className="assistant--recommendation-item">
                <FontAwesomeIcon icon ={faLocation} />
                <div>
                    <p>{item.name}</p>
                    <p>Open {getTimeDetails(item.schedule.opening)} - {getTimeDetails(item.schedule.closing)}</p>
                    <p>Entrance Fee: {getFeeDetails(item.fee.min, item.fee.max)}</p>
                </div>
            </div>
        )
    })
    
    return (
        <div className="assistant--recommendation">
            {displayItem}
        </div>
    )
} 

export default Recommendation