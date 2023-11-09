import { useState } from "react"

const useItineraryManager = (authTokens) => {
    const [itineraries, setItineraries] = useState()
    const access = String(authTokens.access)

    const getUserItineraries = async () => {
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

    const deleteUserItinerary = async (id) => {
        console.log("deleting")

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
        itineraries,
        getUserItineraries,
        deleteUserItinerary,
    }
}

export default useItineraryManager