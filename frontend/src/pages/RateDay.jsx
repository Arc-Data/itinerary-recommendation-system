import { useContext, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import useRatingManager from "../hooks/useRatingManager"
import AuthContext from "../context/AuthContext"
import dayjs from "dayjs"
import getFeeDetails from "../utils/getFeeDetails"
import getTimeDetails from "../utils/getTimeDetails"

const RateDay = () => {
    const { id } = useParams()
    const { authTokens } = useContext(AuthContext)
    const { loading, error, day, getDayRating } = useRatingManager(authTokens) 
    const navigate = useNavigate()

    useEffect(() => {
        getDayRating(id)
    }, [])

    const handleBack = () => {
        navigate(-1)
    }

    console.log(day?.locations)

    const displayLocations = day && day.locations.map(location => {
        const fee = getFeeDetails(location.min_cost, location.max_cost)
        const opening_time = getTimeDetails(location.opening)
        const closing_time = getTimeDetails(location.closing) 
        return (
            <div key={location.id} location={location} className="add-location-modal--search-item">
                <img src={`http://127.0.0.1:8000${location.primary_image}`} width={120} height={80}/>
                <div>
                    <Link to={`/location/${location.id}`}>
                    <p className="add-location-modal--title">{location.name}</p>
                    </Link>
                    <p className="add-location-modal--subtext">{location.address}</p>
                    <p className="add-location-modal--subtext"><span>Opens {opening_time} - {closing_time} </span>•<span> Entrance Fee: {fee} </span></p>
                </div>
            </div>
        )
    })

    if (error) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <div className="profile--main-content">
            <div className="back" onClick={handleBack}>
                <img src="/back.svg" alt="Back" />
                <span>Back</span>
            </div>
            {loading ? 
            <div>Loading...</div>
            :
            <>
            <div className="profile--rating-header">
                <div className="header-title">
                    <p>{day.name}</p>
                    <div className="day-number-badge">{day.day_number}</div>
                </div>
                <div className="header-subtitle">
                    <img src="/calendar.svg" alt="" />
                    <span>{dayjs(day.date).format("MMM M, YYYY")}</span>
                </div>
            </div>
            <div className="profile--rate-locations">
                <div className="profile--rate-locations-container">
                    {displayLocations}
                </div>
                <div>
                    <div className="profile--rate-modal">
                        <p>Finished this trip? Mark it as completed.</p>
                        <button className="profile--rate-btn">
                            <img src="/check.svg" alt="" />
                            <p>Mark as complete</p>
                        </button>
                    </div>
                </div>
            </div>
            </>
            }
        </div>
    )
}

export default RateDay