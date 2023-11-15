import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"

const Rate = () => {
    const { authTokens } = useContext(AuthContext)
    const [ratings, setRatings] = useState([])
    const [loading , setLoading] = useState(true)
    const [error, setError] = useState(false)

    console.log(ratings)

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

    if (error) {
        return (
            <div className="profile--container">
                {error}
            </div>
        )
    }

    return (
        <div className="profile--container">
            <p>To Rate</p>
            {loading ?
            <div> Loading days data...</div>
            :
            <div>
                Retrieved Data successfully
            </div>
            }
        </div>
    )
}

export default Rate