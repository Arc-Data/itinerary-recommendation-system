import { useState } from "react"

const useDayManager = (authTokens) => {
    const access = String(authTokens.access)
    const [ days, setDays ] = useState()
    const [ error, setError ] = useState(false) 
    const [ loading, setLoading ] = useState(false) 

    const getDays = async (itinerary_id) => {
        setLoading(true)
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/itinerary/${itinerary_id}/days/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                }
            })

            const data = await response.json()
            setDays(data)
        }
        catch (error){
            setError(error)
        } 
        finally {
            setLoading(false)
        }
    }

    const updateDayColor = async (id, color) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/day/${id}/color/`, {
                "method": "POST",
                "headers": {
                    'Content-Type': "application/json",
                },
                "body": JSON.stringify({
                    "color": color
                })
            })

            const data = await response.json()
            return data
        }
        catch (error) {
            console.log("Error while updating color data :", error)
        }
     }

    const updateCalendarDays = (days) => {
        setDays(days)
    }

    const deleteDay = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/day/${id}/delete/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${access}`,
                }
            })
        }
        catch (error) {
            console.log("Error while deleting day: ", error)
        } 
    }

	const removeDay = (dayId) => {
		const currentDays = days.filter(day => dayId !== day.id)
		setDays(currentDays)
	} 

    const updateDays = (dayId, replacement) => {
        const currentDays = days.map(day => {
			if (day.id === dayId) {
				return replacement
			}

			return day
		})

		setDays(currentDays)
	}
    
    return {
        days,
        error,
        loading,
        getDays,
        deleteDay,
        removeDay,
        updateDays,
        updateDayColor,
        updateCalendarDays,
    }
}

export default useDayManager