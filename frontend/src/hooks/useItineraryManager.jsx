import { useState } from "react"

const useItineraryManager = (authTokens) => {
    const [itineraries, setItineraries] = useState([])
    const [itinerary, setItinerary] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [editedName, setEditedName] = useState("")
    const access = String(authTokens.access)

    const getItineraryById = async (id) => {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/itinerary/${id}/`, {
                'method' : 'GET',
                'headers': {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${access}`, 
                }
            })

            if (response.status === 403) {
                setError(403)

            } else if (response.status === 404) {
                setError(404)
            
            } else if (!response.ok) {
                throw new Error("Something wrong happened")
            
            } else {
                const data = await response.json();

                setLoading(false)
                setItinerary(data)
                setEditedName(data.name)
                return data.id
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
        setLoading(true)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/itinerary/list/', {
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
        catch (error) {
            setError("An error occured while retrieving itineraries")
        } 
        finally {
            setLoading(false)
        }
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

    const editItineraryName = async (id) => {
        if (editedName === itinerary.name) return 

        try {
            fetch(`http://127.0.0.1:8000/api/itinerary/${id}/edit/name/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${access}`,
                },
                body: JSON.stringify({
                    name: editedName
                })
            })

            const editedItinerary = {
                ...itinerary,
                "name": editedName
            }

            setItinerary(editedItinerary)
        }
        catch (error) {
            console.log("An error occured while editing name")
        }
    }

    const cancelEditName = () => {
        setEditedName(itinerary.name)
    }

    return {
        error,
        loading,
        itinerary,
        itineraries,
        editedName,
        setEditedName,
        getItineraries,
        getItineraryById,
        editItineraryName,
        deleteItinerary,
        cancelEditName,
    }
}

export default useItineraryManager