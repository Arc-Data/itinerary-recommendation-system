import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

const Rate = () => {
    const { authTokens } = useContext(AuthContext)
    const [ratings, setRatings] = useState([])
    const [loading , setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/days/complete/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${String(authTokens.access)}`
                    }
                })
    
                const data = await response.json()
                setRatings(data)
                setLoading(false)
            }
            catch(error) {
                setError("An error has occured while retrieving completed days data")
            }
        }

        fetchRatings()
    }, [])

    const displayRatings = ratings && ratings.map(rating => {
        const locations = rating.locations.join(" • ")

        return (
            <div key={rating.id} className="profile--ratings-item">
                <Link to={`/profile/rate/${rating.id}`}>
                    <img src={`http://127.0.0.1:8000${rating.image}`} width={200} height={100}/>
                </Link>
                <div className="profile--ratings-content">
                    <div className="profile--ratings-name">
                        <p className="profile--ratings-item-name">{rating.name}</p>
                        <div className="day-number-badge">{rating.day_number}</div>
                    </div>
                    <div>
                        <img src="/calendar.svg" />
                        <span>{dayjs(rating.date).format("MMMM M, YYYY")}</span>
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
            <p className="header-subtitle">To Rate</p>
            {loading ?
            <div> Loading days data...</div>
            :
            <div className="profile--ratings-container">
                {displayRatings}
            </div>
            }
        </div>
    )
}

export default Rate