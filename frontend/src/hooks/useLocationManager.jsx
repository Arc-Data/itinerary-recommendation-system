import { useState } from "react"

const useLocationManager = (authTokens) => {
    const access = String(authTokens.access)
    const [location, setLocation] = useState()
    const [result, setResult] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const createLocation = async (location) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/location/create/', {
                "method": "POST",
                "headers": {
                    "Authorization": `Bearer ${access}`,
                },
                "body": location
            })
            
            const data = await response.json()
            return data.id
        }
        catch (error) {
            console.log(error)
        }

    }

    const getLocations = async (page, query = "") => {
        setLoading(true)
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/location/paginated/?query=${query}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await response.json()
            setResult(data)
        }   
        catch(error) {
            setError("Something has occured")
        } finally {
            setLoading(false)
        }
        
    }

    const getLocation = async (id) => {
        setLoading(true)
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/location/${id}`, {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authTokens.access}`
                },
            })

            if(response.status===404) {
                setError(404)
            } else if(response.status===403) {
                setError(403)
            }     

            const data = await response.json()
            setLocation(data)
        }
        catch (error) {
            console.log("An error occured")
        } finally {
            setLoading(false)
        }
    }

    const deleteLocation = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/location/${id}/delete/`, {
                "method": "DELETE",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`,
                },
            })
        }
        catch (error) {
            console.log("Encountered error while deleting location : ", error)
        }
    }
    
    return {
        location,
        result,
        error,
        loading,
        getLocation,
        getLocations,
        createLocation,
        deleteLocation
    }
}

export default useLocationManager