import { useState } from "react"

const useLocationManager = (authTokens) => {
    const access = String(authTokens.access)
    const [location, setLocation] = useState()
    const [locations, setLocations] = useState([])
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
            
            return response.ok;
        }
        catch (error) {
            console.log(error)
        }

        return false;
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

            console.log(response)
    
            if(response.status===404) {
                setError(404)
            } else if(response.status===403) {
                setError(403)
            }     
            const data = await response.json()
            setLocation(data)
            console.log(data)
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

        }
    }
    
    return {
        location,
        error,
        loading,
        getLocation,
        createLocation,
        deleteLocation
    }
}

export default useLocationManager