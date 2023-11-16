import { useState } from "react"

const useRatingManager = (authTokens) => {
    const [day, setDay] = useState()
    const [days, setDays] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const getDaysRating = () => {

    }
    
    const getDayRating = async (id) => {
        setLoading(true)
        
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/day/${id}/detail/`, {
                header: "GET",
            })

            const data = await response.json()
            setDay(data)
        }
        catch(error) {
            setError("An error occured while fetching Day data: ", error)
        }
        finally {
            setLoading(false)
        }
    }
    
    return {
        loading,
        error,
        day,
        days,
        getDayRating,
    }
}

export default useRatingManager