import { useState, useContext } from 'react';
/*COMPONENTS*/
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import AuthContext from '../context/AuthContext';
/*DATA*/
import cardData from '../cardData';

export default function LandingPage() {
	
	const [isLoginOpen, setLoginOpen] = useState(false)
	const [isSignOpen, setSignOpen] = useState(false)
	
	const toggleLoginModal = (event) => {
		if(event) {
			event.stopPropagation();
		}
		setLoginOpen(prev => !prev)
	}
	
	const toggleSignModal = (event) => {
		if(event) {
			event.stopPropagation();
		}
		setSignOpen(prev => !prev)
	}
	const limitedCardData = cardData.slice(0, 6);
	
	const cards = limitedCardData.map((item) => (
		<Card key={item.id} {...item} />
	));

	return (
		<div>
			<Navbar 
				isLoginOpen={isLoginOpen} 
				toggleLoginModal={toggleLoginModal} 
				isSignOpen={isSignOpen}
				toggleSignModal={toggleSignModal}/>
			<div className='hero'>
				<div className='title'>
					<h1>Plan your next trip to Cebu</h1>
					<p>
						Discover the best routes, attractions, food places and accommodations for your
						Cebu trip with CebuRoute's expert guidance.
					</p>
					<button onClick={toggleLoginModal}>
						Get Started
					</button>
				</div>
			</div>
			{/* <div className='hero--map d-Grid'>
				<div className='hero--map-photo1'>
					<img className='hero--map-photo' src="../images/3.png" />
				</div>
				<div className='hero--map-text'>
					<h1 className='hero--h1'>See your itinerary in one view</h1>
					<p className='hero--p'>No more switching between apps and tabs to plan your trip.</p>
				</div>
			</div> */}
			<div className="hero--guide">
				<h1>How CebuRoute™ Works</h1>
				<div className="guide--cards">
					<div className="card">
						<h1>Define your adventure</h1>
						<p>Choose your travel style: nature, art, or activity. Your journey, your theme.</p>
					</div>
					<div className="card">
						<h1>Personalize the details</h1>
						<p>Set trip length, budget, group size, and meal preferences. We'll tailor everything to you.</p>
					</div>
					<div className="card">
						<h1>Crafted just for you</h1>
						<p>We create an itinerary with attractions, meals, and experiences that match your style.</p>
					</div>
				</div>
				<p>Start your adventure with CebuRoute™ today and let your dream trip unfold effortlessly.</p>
			</div>
			<div className='hero--destination'>
				<h1 className='hero--destination-title'>Discover Destination</h1>
				<div className='hero--cards'>
					{cards}
				</div>
			</div>
			<Footer />
		</div>
	);
}