import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Day from "../components/Day"

const Plan = () => {
  	const [itinerary, setItinerary] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [days, setDays] = useState(null)
	const { authTokens } = useContext(AuthContext)
	const { id } = useParams()
	
	const handleChange = (name, value) => {
		setItinerary({
            ...itinerary,
            [name]: value,
        });	
	}

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
			setLoading(false)
			console.log(data)
		}

		fetchItineraryData()
	}, [ id ])

	console.log(`Actual itinerary value : ${itinerary}`)

	const getDays = days && days.map(day => {
		return <Day key={day.id} day={day}/>
	})

	if(isLoading) return (
		<div>Loading Please Wait</div>
	)

	return (
    	<div className="plan--layout">
			<div className="plan--side-panel">
				<form>
					<div className="plan--form-content">
						<div className="form-row">
							<label htmlFor="budget">Budget per person</label>
							<input 
								type="text"
								name="budget"
								id="budget"
								onChange={handleChange}
								value={itinerary.budget}
							/>
						</div>
						<div className="form-row">
							<label htmlFor="numberOfPeople">Number of people</label>
							<input 
								type="text"
								name="numberOfPeople"
								id="numberOfPeople"
								onChange={handleChange}
								value={itinerary.number_of_people}
							/>
						</div>
					</div>
				</form>
			</div>
			<div className="plan--main-panel">
				<div className="plan--header">
					<h1>Itinerary</h1>
					<button className="plan--save-btn">Save</button>
				</div>
				{getDays}
			</div>
		</div>
  	)
}

export default Plan