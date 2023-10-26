import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Day from "../components/Day"
import dayjs from "dayjs"
import CreateNav from "../components/CreateNav"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDirections, faMap, faMoneyBill, faMoneyBills } from "@fortawesome/free-solid-svg-icons"

const Plan = () => {
  	const [itinerary, setItinerary] = useState({
		number_of_people: '1',
		budget: ''
	})
	const [markers, setMarkers] = useState([])
	const [isLoading, setLoading] = useState(true)
	const [days, setDays] = useState(null)
	const [isExpenseOpen, setExpenseOpen] = useState(true)
	const [isItineraryOpen, setItineraryOpen] = useState(true)
	const [includedLocations, setIncludedLocations] = useState([])
	const [error, setError] = useState(null)
	const { authTokens } = useContext(AuthContext)
	const { id } = useParams()

	const addMarker = (latitude, longitude) => {
		const mapMarkers = [...markers]
		mapMarkers.push({
			lng: longitude,
			lat: latitude
		})

		setMarkers(mapMarkers)
	}

	const deleteMarker = (latitude, longitude) => {
		const mapMarkers = markers.filter(i => i.lng !== longitude && i.lat !== latitude)
		setMarkers(mapMarkers)
	}
	
	const toggleExpense = () => {
		setExpenseOpen(prev => !prev)
	}
	
	const toggleItinerary = () => {
		setItineraryOpen(prev => !prev)
	}

	useEffect(() => {
		const fetchItineraryData = async (e) => {
			const locations = []
			
			try {
				const response = await fetch(`http://127.0.0.1:8000/api/plan/${id}/`, {
					'method' : 'GET',
					'headers': {
						"Content-Type" : "application/json",
						"Authorization": `Bearer ${String(authTokens.access)}`, 
					}
				})
				
				if (response.status === 403) {
					setLoading(false)
					setError("Access Denied")

				} else if (response.status === 404) {
					setLoading(false)
					setError("Itinerary Does not Exist")
				
				} else if (!response.ok) {
					throw new Error("Something wrong happened")
				
				} else {
					const data = await response.json();
					const mapMarkers = []
					setItinerary(data.itinerary)
					setDays(data.days)
					
					data.days.forEach(day => {
						day.itinerary_items.forEach(location => {
							locations.push(...day.itinerary_items)
							mapMarkers.push({
								lng: location.details.longitude,
								lat: location.details.latitude,
							})
						})
					})

					setIncludedLocations(locations)
					setMarkers(mapMarkers)
					setLoading(false)
				}
			}
			catch (e){
				setLoading(false)
				setError("Something went wrong")
			}

		}

		fetchItineraryData()
	}, [ id ])

	const getDays = days && days.map(day => {
		return <Day 
			key={day.id} 
			day={day} 
			addMarker={addMarker}
			deleteMarker={deleteMarker}
			includedLocations={includedLocations}
			setIncludedLocations={setIncludedLocations}/>
	})

	const getDayTabs = days && days.map(day => {
		return (
			<div key={day.id}>
				<p></p>
				<p>{dayjs(day.date).format('ddd, M/D')}</p>
			</div>
		)
	})

	if (isLoading) return (
		<div>Loading Please Wait</div>
	)

	if (error) return (
		<div>{error}</div>
	)
 
	return (
		<div className="create--layout">
			<div>
				<CreateNav />
				<div className="plan--layout">
					<aside className="plan--side-panel">
						<div 
							className="plan--accordion-header" 
							onClick={toggleExpense}>
							<FontAwesomeIcon icon={faMoneyBill}/>
							<p>Expense</p>
						</div>
						{isExpenseOpen && 
						<div className="plan--accordion-content">
							<div >
								<p></p>
								<p>Budget</p>
							</div>
							<div >
								<p></p>
								<p>Group Size</p>
							</div>
						</div>}
						<div 
							className="plan--accordion-header" 
							onClick={toggleItinerary}>
							<FontAwesomeIcon icon={faMap} />
							<p>Itinerary</p>
						</div>
						{isItineraryOpen && 
						<div className="plan--accordion-content">
							{ getDayTabs }
						</div>
						}
					</aside>
					<main className="plan--main-panel">
						<section className="plan--expense-section">
							<p className="plan--title">Expenses</p>
							<div className="plan--expense-form">
								<div className="form-row">
									<label htmlFor="number_of_people">Groupsize</label>
									<input 
										type="number" 
										name="number_of_people"
										id="number_of_people"
										defaultValue={itinerary.number_of_people}/>
										
								</div>
								<div className="form-row">
									<label htmlFor="budget">Budget <span>(per person)</span></label>
									<input 
										type="number" 
										name="budget" 
										id="budget"
										defaultValue={itinerary.budget}/>							
								</div>
							</div>
						</section>
						<section className="plan--itinerary-section">
							<p className="plan--title">Itinerary</p>
							{getDays}
						</section>
					</main>
				</div>
			</div>
			<Map markers={markers}/>
		</div>
    	
  	)
}

export default Plan