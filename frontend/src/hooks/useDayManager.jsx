import { useState } from "react"

const useDayManager = (authTokens) => {
    const access = String(authTokens.access)
    const [ days, setDays ] = useState()
    const [ error, setError ] = useState(false) 
    const [ loading, setLoading ] = useState(false) 
    const [ markers, setMarkers ] = useState([])
    const [ includedLocations, setIncludedLocations ] = useState() 

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

    const getMarkersData = () => {
        const locations = []
        const mapMarkers = []

        if(days) {
            days.forEach(day => {
                day.itinerary_items.forEach(location => {
                    locations.push(...day.itinerary_items)
                    mapMarkers.push({
                        lng: location.details.longitude,
                        lat: location.details.latitude,
                        color: day.color,
                    })
                })
            })
        }

        setIncludedLocations(locations)
        setMarkers(mapMarkers)
    }
    
    return {
        days,
        error,
        loading,
        getDays,
        getMarkersData,
        markers,
        includedLocations,
    }
}

export default useDayManager