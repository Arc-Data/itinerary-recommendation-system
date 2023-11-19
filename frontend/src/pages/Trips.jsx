import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import useItineraryManager from "../hooks/useItineraryManager"
import Itinerary from "../components/Itinerary"

const Trips = () => {
	const { authTokens } = useContext(AuthContext)
	const { 
		itineraries, 
		loading,
		error,
		deleteItinerary,
		getItineraries } = useItineraryManager(authTokens)
	
	const displayItineraries = itineraries && itineraries.map(itinerary => {
		return (
			<Itinerary key={itinerary.id} itinerary={itinerary} handleDelete={deleteItinerary}/>
		)
	})

	useEffect(() => {
		getItineraries()
	}, [])

	if (error) {
		<div className="profile-trips--container">
			{error}
		</div>
	}

	return (
		<div className="profile--main-content">
			<p className="header-title">Your trips</p>
			<p className="header-subtitle">Recent</p>
			{loading ? 
			<div>
				Loading...
			</div>
			:
			<div className="trips--container">
				{displayItineraries}
			</div>
			}
		</div>
	)
}

export default Trips