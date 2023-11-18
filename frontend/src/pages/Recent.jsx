import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import StarDefault from "../components/StarDefault"
import useDayManager from "../hooks/useDayManager"

const Recent = () => {
    const { authTokens } = useContext(AuthContext)
    const { days, error, loading, getRecentDays, markDayAsComplete } = useDayManager(authTokens)

    const handleMarkAsComplete = (id) => {
        markDayAsComplete(id)
        getRecentDays()
    }

    useEffect(() => {
        getRecentDays()
    }, [])

    const displayDays = days && days.map(day => {
        const locations = day.locations.join(" • ")
        console.log(day)

        return (
            <div key={day.id} className="profile--ratings-item">
                <Link to={`/profile/rate/${day.id}`}>
                    <img src={`http://127.0.0.1:8000${day.image}`} width={200} height={100}/>
                </Link>
                <div className="profile--ratings-content">
                    <div className="profile--ratings-name">
                        <div className="flex-10">
                            <p className="profile--ratings-item-name">{day.name}</p>
                            <div className="day-number-badge">{day.day_number}</div>
                        </div>
                        <div className="flex-10">
                            
                            {day.completed ?
                            <>
                            
                            {day.rating ? 
                                <div className="flex-10">
                                    <div>{day.rating}</div>
                                    <StarDefault color={'#000'} />
                                </div>
                                :
                                <Link to={`${day.id}`} className="profile--rating-btn">Leave a Rating!</Link>
                            }
                            </>
                            :
                            <>
                            <Link to={`/plan/${day.itinerary}`}>
                                <img src="/pencil.svg" alt="" />
                            </Link>
                            <button className="profile--mark-btn" onClick={() => handleMarkAsComplete(day.id)}>
                                <img src="/check.svg" alt="" />
                            </button>
                            </>
                            }
                        </div>
                    </div>
                    <div>
                        <img src="/calendar.svg" />
                        <span>{dayjs(day.date).format("MMMM M, YYYY")}</span>
                    </div>
                    <div>
                        <img src="/trip.svg" />
                        <span>{locations}</span>
                    </div>
                    <p></p>
                </div>
            </div>
        )
    })

    if (error) {
        return (
            <div className="profile--container">
                {error}
            </div>
        )
    }

    return (
        <div className="profile--main-content">
            <p className="header-title">Your trips</p>
            <p className="header-subtitle">Recent Activities</p>
            {loading ?
            <div> Loading days data...</div>
            :
            <div className="profile--ratings-container">
                {displayDays}
            </div>
            }
        </div>
    )
}

export default Recent