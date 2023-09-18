import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Itinerary from "../components/Itinerary";
import { Link } from "react-router-dom";

const HomePage = () => {
	const { authTokens } = useContext(AuthContext)
	const [trips, setTrips] = useState(null)

	useEffect(() => {
		const access = String(authTokens.access)
		const getUserItineraries = async () => {
			const response = await fetch('http://127.0.0.1:8000/api/itineraries/', {
 				method: "GET",
				headers: {
					'Content-Type': 'application.json',
					'Authorization': `Bearer ${access}`,
				}
		 	})

			if(!response.ok) {
				throw new Error('Error retrieving itinerary information')
			}

			const data = await response.json()
			setTrips(data)
		}

		getUserItineraries();
	}, [])

	const displayItineraries = trips && trips.map(trip => {
		return (
			<Link to="/home">
				<Itinerary key={trip.id} itinerary={trip}/>
			</Link>
		)
	})


	return (
		<div className = "home--page-content">
			<header className="home--banner">
				<div className="home--banner-itinerary">You have not created an itinerary yet.</div>
				<div className="home--banner-business">Promote your food business with CebuRoute</div>
				<div className="home--banner-ai">Try our AI Recommendations Feature while building your itinerary.</div>
			</header>
			{ trips !== null && (
			<div>
				<p className="home--your-trips">Your trips</p>
				<div className="home--trip-containers">
					{displayItineraries}
				</div>
			</div>
			)}
		</div>
	)
}

export default HomePage;