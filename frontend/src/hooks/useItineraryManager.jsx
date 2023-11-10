import { useState } from "react"

const useItineraryManager = (authTokens) => {
    const [itineraries, setItineraries] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const access = String(authTokens.access)

    const getItineraryById = async (id) => {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/itinerary/${id}/`, {
                'method' : 'GET',
                'headers': {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${String(authTokens.access)}`, 
                }
            })

            if (response.status === 403) {
                setError("Access Denied")

            } else if (response.status === 404) {
                setError("Itinerary Does not Exist")
            
            } else if (!response.ok) {
                throw new Error("Something wrong happened")
            
            } else {
                const data = await response.json();

                setLoading(false)
                return data
            }
        }
        catch (e){
            setError("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    const getItineraries = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/itineraries/', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
            }
        })

        if(!response.ok) {
            throw new Error('Error retrieving itinerary information')
        }

        const data = await response.json()
        setItineraries(data)
    }

    const deleteItinerary = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/itinerary/${id}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`,
            }
        })

        const updatedItineraries = itineraries.filter(itinerary => itinerary.id !== id)
        setItineraries(updatedItineraries)
    }

    return {
        error,
        loading,
        itineraries,
        getItineraries,
        getItineraryById,
        deleteItinerary,
    }
}

export default useItineraryManager