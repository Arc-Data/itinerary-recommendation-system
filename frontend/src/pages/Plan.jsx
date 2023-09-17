import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Day from "../components/Day"

const Plan = () => {
  	const [itinerary, setItinerary] = useState(null)
	const [days, setDays] = useState(null)
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
			setItinerary(data.itinerary)
			setDays(data.days)
		}

		fetchItineraryData()
	}, [ id ])

	const getDays = days && days.map(day => {
		return <Day key={day.id} day={day}/>
	})
	

	return (
    	<div className="plan--layout">
			<div className="plan--side-panel"></div>
			<div className="plan--main-panel">
				{getDays}
			</div>
		</div>
  	)
}

export default Plan