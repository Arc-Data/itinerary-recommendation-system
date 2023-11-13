import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Itinerary from "../components/Itinerary";
import useItineraryManager from "../hooks/useItineraryManager";

const HomePage = () => {
	const { authTokens } = useContext(AuthContext)
	const { itineraries, getItineraries, deleteItinerary } = useItineraryManager(authTokens)

	useEffect(() => {
		getItineraries();
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
			{ itineraries !== null && (
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