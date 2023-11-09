import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Itinerary from "../components/Itinerary";
import useItineraryManager from "../hooks/useItineraryManager";

const HomePage = () => {
	const { authTokens } = useContext(AuthContext)
	const { itineraries, getUserItineraries, deleteUserItinerary } = useItineraryManager(authTokens)

	useEffect(() => {
		getUserItineraries();
	}, [])


	const displayItineraries = itineraries && itineraries.map(itinerary => {
		return (
			<Itinerary key={itinerary.id} itinerary={itinerary} onClick={deleteUserItinerary}/>
		)
	})

	return (
		<div className = "home--page-content">
			<header className="home--banner">
				<div className="home--banner-itinerary">You have not created an itinerary yet.</div>
				<div className="home--banner-business">Promote your food business with CebuRoute</div>
				<div className="home--banner-ai">Try our AI Recommendations Feature while building your itinerary.</div>
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