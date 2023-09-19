import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Day from "../components/Day"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Plan = () => {
  	const [itinerary, setItinerary] = useState(null)
	const [days, setDays] = useState(null)
	const { user, authTokens } = useContext(AuthContext)
	const { id } = useParams()
	// get the id parameter present in the url

	console.log(itinerary)
	
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
			console.log(itinerary, days)
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
			<div className="plan--side-panel">
				<label>Start Date</label>
				<input
					type="date"
				/>

				<label>End Date</label>
				<input
					type="date"
				/>
				
				<label>Budget per person</label>
				<input 
					type="text"
				/>

				<label>Number of people</label>
				<input 
					type="text"
				/>


			</div>
			<div className="plan--main-panel">
				<div className="plan--header">
					<h1>Itinerary</h1>
					<button className="plan--save-btn">Save</button>
				</div>
				<div>
					<div class="plan--itinerary">
						<div class="accordion-item">
							<input type="checkbox" id="item1"/>
							<label for="item1" class="accordion-header">Sept. 14, 2023 - Thursday</label>
							<div class="accordion-content">
								<div className="plan--itinerary-result">
									<p>Need help with your itinerary? Try our AI assistant</p>
									<button className="plan--ai-btn">AI Assistant</button>
								</div>
								<div className="plan--itinerary-item">
									<FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
									<div>
										<p className="plan--location-name">Magellan's Cross</p>
										<div className="plan--location-details">
											<span>Historical Site • </span>
											<span>Free • </span>
											<span>8:00 AM</span>
										</div>
									</div>
									<img className="plan--location-img" src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Magellan%27s_Cross_in_Cebu.jpg" alt="" />
								</div>
								<div className="plan--itinerary-item">
									<FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
									<div>
										<p className="plan--location-name">Fort San Pedro</p>
										<div className="plan--location-details">
											<span>Historical Site • </span>
											<span>₱20 • </span>
											<span>10:00 AM</span>
										</div>
									</div>
									<img className="plan--location-img" src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Fort_San_Pedro%2C_Cebu-City_%2849063919082%29.jpg" alt="" />
								</div>
								<div className="plan--itinerary-item">
									<FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
									<div>
										<p className="plan--location-name">Temple of Leah</p>
										<div className="plan--location-details">
											<span>Historical Site • </span>
											<span>₱100 • </span>
											<span>10:00 AM</span>
										</div>
									</div>
									<img className="plan--location-img" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/bf/4c/b1/photo5jpg.jpg?w=1200&h=1200&s=1" alt="" />
								</div>
							</div>
							<div>
								<input 
									type="text"
									placeholder="Add a location"
								/>
							</div>
						</div>
					</div>
				</div>
				{/* {getDays} */}
			</div>
		</div>
  	)
}

export default Plan