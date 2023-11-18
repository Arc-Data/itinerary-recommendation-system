import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Itinerary from "../components/Itinerary";
import useItineraryManager from "../hooks/useItineraryManager";
import useDayManager from "../hooks/useDayManager";

const HomePage = () => {
	const { authTokens } = useContext(AuthContext)
	const { itineraries, getItineraries, deleteItinerary } = useItineraryManager(authTokens)
	const { days, error, loading, getActiveTrips } = useDayManager(authTokens)

	useEffect(() => {
		getItineraries();
		getActiveTrips();
	}, [])

	const displayItineraries = itineraries && itineraries.map(itinerary => {
		return (
			<Itinerary key={itinerary.id} itinerary={itinerary} handleDelete={deleteItinerary}/>
		)
	})

	return (
		<div className = "home--page-content">
			<header className="home--banner">
				<div className="home--banner-itinerary">
					<p>You have not created an itinerary yet.</p>
					<img src="/banner-1.jpg" className="banner-img"/>
				</div>
				<div className="home--banner-business">
					<p>Promote your food business with CebuRoute</p>
					<img src="/banner-2.png" className="banner-img" />
				</div>
				<div className="home--banner-ai">
					<p>Try our AI Recommendations Feature while building your itinerary.</p>
					<img src="/banner-3.png" className="banner-img" />
				</div>
			</header>
			{ days && 
			<div>
				<p className="header-title">Active</p>
				<p className="header-subtitle">Ongoing Trips</p>
				<div className="active--trips-container">

				</div>
			</div>
			}
			{ itineraries && (
			<div>
				<p className="home--your-trips">Your trips</p>
				<div className="trips--container">
					{displayItineraries}
				</div>
			</div>
			)}
		</div>
	)
}

export default HomePage;