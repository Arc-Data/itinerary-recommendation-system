import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const Plan = () => {
  	const [itinerary, setItinerary] = useState([])
	const { user, authTokens } = useContext(AuthContext)
	const { id } = useParams()
	// get the id parameter present in the url

	useEffect(() => {

		const fetchItineraryData = async (e) => {
			const userToken = String(authTokens.access)
			const response = await fetch(`http://127.0.0.1:8000/api/plan/${id}/`, {
				'method' : 'GET',
				'headers': {
					"Content-Type" : "application/json",
					"Authorization": `Bearer ${userToken}`, 
				}
			})

			if (!response.ok) {
				throw new Error("Error fetching itinerary data");
			} 
	  
			const data = await response.json();
			console.log(data)
		}

		fetchItineraryData()
	}, [ id ])

	return (
    	<div>Plan {id}</div>
  	)
}

export default Plan