import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Day from "../components/Day"
import dayjs from "dayjs"
import CreateNav from "../components/CreateNav"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMap, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import DateSettings from "../components/DateSettings"
import useItineraryManager from "../hooks/useItineraryManager"
import useDayManager from "../hooks/useDayManager"

const Plan = () => {
	const { authTokens } = useContext(AuthContext)
	const [ itinerary, setItinerary ] = useState({
		number_of_people: '1',
		budget: ''
	})
	const { id } = useParams()

	const { 
		loading,
		error,
		getItineraryById, 
	} = useItineraryManager(authTokens)

	const {
		days,
		getDays,
	} = useDayManager(authTokens)

	useEffect(() => {
		const fetchData = async () => {
			const userItinerary = await getItineraryById(id)
			setItinerary(userItinerary)
			await getDays(userItinerary.id)
		}

		fetchData()
	}, [id])

	useEffect(() => {

	}, [days]) 

	const handleNameSave = async () => {

	}

  	// const [itinerary, setItinerary] = useState({
	// 	number_of_people: '1',
	// 	budget: ''
	// })
	// const [markers, setMarkers] = useState([])
	// const [isLoading, setLoading] = useState(true)
	// const [days, setDays] = useState(null)
	// const [includedLocations, setIncludedLocations] = useState([])
	// const [error, setError] = useState(null)
	
	const [isExpenseOpen, setExpenseOpen] = useState(true)
	const [isItineraryOpen, setItineraryOpen] = useState(true)
	const [isCalendarOpen, setCalendarOpen] = useState(false)

	// const addMarker = (latitude, longitude, color) => {
	// 	const mapMarkers = [...markers]
	// 	mapMarkers.push({
	// 		lng: longitude,
	// 		lat: latitude,
	// 		color: color,
	// 	})

	// 	setMarkers(mapMarkers)
	// }

	// const deleteMarker = (latitude, longitude) => {
	// 	const mapMarkers = markers.filter(i => i.lng !== longitude && i.lat !== latitude)
	// 	setMarkers(mapMarkers)
	// }

	const toggleCalendar = (e) => {
		if(e) {
			e.stopPropagation()
		}

		setCalendarOpen(prev => !prev)
	}
	
	const toggleExpense = () => {
		setExpenseOpen(prev => !prev)
	}
	
	const toggleItinerary = () => {
		setItineraryOpen(prev => !prev)
	}

	// const updateCalendarDays = (days) => {
	// 	setDays(days)
	// }


	// useEffect(() => {
		// const locations = []
		// const mapMarkers = []
					
		// if (days) {
		// 	days.forEach(day => {
		// 		day.itinerary_items.forEach(location => {
		// 			locations.push(...day.itinerary_items)
		// 			mapMarkers.push({
		// 				lng: location.details.longitude,
		// 				lat: location.details.latitude,
		// 				color: day.color,
		// 			})
		// 		})
		// 	})
			
		// 	setIncludedLocations(locations)
		// 	setMarkers(mapMarkers)
		// }

	// }, [days])

	// const removeDay = (dayId) => {
	// 	const currentDays = days.filter(day => dayId !== day.id)
	// 	setDays(currentDays)
	// } 

	// const updateDays = (dayId, replacement) => {
	// 	const currentDays = days.map(day => {
	// 		if (day.id === dayId) {
	// 			return replacement
	// 		}

	// 		return day
	// 	})
		
	// 	setDays(currentDays)
	// }

	// const getDays = days && days.map(day => {
	// 	return <Day 
	// 		key={day.id} 
	// 		day={day} 
	// 		updateDays={updateDays}
	// 		removeDay={removeDay}
	// 		addMarker={addMarker}
	// 		deleteMarker={deleteMarker}
	// 		includedLocations={includedLocations}
	// 		setIncludedLocations={setIncludedLocations}/>
	// })

	const getDayTabs = days && days.map(day => {
		return (
			<div key={day.id}>
				<p></p>
				<p>{dayjs(day.date).format('ddd, M/D')}</p>
			</div>
		)
	})

	if (loading) return (
		<div>Loading Please Wait</div>
	)

	if (error) return (
		<div>{error}</div>
	)
 
	return (
		<>
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
							<div className="plan--itinerary-header">
								<p className="plan--title">Itinerary</p>
								<div className="plan--calendar-settings">
									{/* {days.length !== 0 && 
									<div className="calendar-info">
										<FontAwesomeIcon icon={faCalendarAlt} />
										<p>
											{dayjs(days[0].date).format('MMM DD')} to {dayjs(days[days.length - 1].date).format('MMM DD')}
										</p>
									</div>
									} */}
									<div className="calendar-icon" onClick={toggleCalendar}>
										<FontAwesomeIcon icon={faCalendarAlt}/>
									</div>
								</div>
							</div>
							{/* {getDays} */}
						</section>
					</main>
				</div>
			</div>
			{/* <Map markers={markers}/> */}
		</div>
		{isCalendarOpen && <DateSettings onClose={toggleCalendar} updateDays={updateCalendarDays}/>}
		</>
    	
  	)
}

export default Plan