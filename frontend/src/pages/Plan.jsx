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
import useMarkerManager from "../hooks/useMarkerManager"

const Plan = () => {
	const { authTokens } = useContext(AuthContext)
	const [ itinerary, setItinerary ] = useState({
		number_of_people: '1',
		budget: ''
	})
	const { id } = useParams()
	const [ includedLocations, setIncludedLocations ] = useState([])

	const { 
		loading: itineraryLoading,
		error: itineraryError,
		getItineraryById, 
	} = useItineraryManager(authTokens)

	const { 
		markers, 
		getMarkersData, 
		deleteMarker, 
		addMarker } = useMarkerManager()

	const {
		loading: daysLoading,
		error: daysError,
		days,
		removeDay,
		updateDays,
		updateCalendarDays,
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
		const locations = getMarkersData(days)
        setIncludedLocations(locations)
	}, [days]) 

	const [isExpenseOpen, setExpenseOpen] = useState(true)
	const [isItineraryOpen, setItineraryOpen] = useState(true)
	const [isCalendarOpen, setCalendarOpen] = useState(false)

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

	const displayDays = days && days.map(day => {
		return <Day 
			key={day.id} 
			day={day} 
			updateDays={updateDays}
			removeDay={removeDay}
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

	if (itineraryLoading) return (
		<div>Loading Itinerary Details</div>
	)

	if(itineraryError) return (
		<div>{itineraryError}</div>
	)

	if (daysLoading) return (
		<div>Loading Related Days Information</div>
	)

	if (daysError) return (
		<div>{daysError}</div>
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
									{days.length !== 0 && 
									<div className="calendar-info">
										<FontAwesomeIcon icon={faCalendarAlt} />
										<p>
											{dayjs(days[0].date).format('MMM DD')} to {dayjs(days[days.length - 1].date).format('MMM DD')}
										</p>
									</div>
									}
									<div className="calendar-icon" onClick={toggleCalendar}>
										<FontAwesomeIcon icon={faCalendarAlt}/>
									</div>
								</div>
							</div>
							{displayDays}
						</section>
					</main>
				</div>
			</div>
			<Map markers={markers}/>
		</div>
		{isCalendarOpen && <DateSettings onClose={toggleCalendar} updateDays={updateCalendarDays}/>}
		</>
    	
  	)
}

export default Plan