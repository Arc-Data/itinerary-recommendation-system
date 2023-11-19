import { useState } from "react"

const useBusinessManager = (authTokens) => {
    const access = String(authTokens.access)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [location, setLocation] = useState()
    const [locations, setLocations] = useState([])
    const [requests, setRequests] = useState([])
    
    const getApprovalRequests = async () => {
        setLoading(true)

        try {
            const response = await fetch('http://127.0.0.1:8000/api/location/requests', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                }
            })

            const data = await response.json()
            setRequests(data)
        }
        catch (error) {
            setError("An error occured while retrieving approval requests")
        } 
        finally {
            setLoading(false)
        }
    }

    const getAllApprovalRequests = async () => {
        setLoading(true)

        try {
            const response = await fetch('http://127.0.0.1:8000/api/requests/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                }
            })

            const data = await response.json()
            setRequests(data)
        }
        catch (error) {
            setError("An error occured while retrieving approval requests")
        } 
        finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        location,
        locations,
        requests, 
        getApprovalRequests,
        getAllApprovalRequests,
    }
}

export default useBusinessManager