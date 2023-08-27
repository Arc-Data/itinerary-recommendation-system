import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
	const { user } = useContext(AuthContext)
	return (
		<div className = "home--page-content">
			<div className="home--page-header">
				<p className="home--your-trips">Your trips</p>
				<button className="home--create-trip">New Trip</button>
			</div>
			<div className="home--trips-container">
				<p className="home--no-trips">You have no trips yet.</p>
			</div>
		</div>
	)
}

export default HomePage;