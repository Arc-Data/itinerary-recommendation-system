import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Day from "../components/Day"
import dayjs from "dayjs"
import CreateNav from "../components/CreateNav"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faMap, faMoneyBill, faPencilAlt, faPencilSquare } from "@fortawesome/free-solid-svg-icons"
import DateSettings from "../components/DateSettings"
import useItineraryManager from "../hooks/useItineraryManager"
import useDayManager from "../hooks/useDayManager"
import useMarkerManager from "../hooks/useMarkerManager"
import Error404 from "../components/Error404"
import Error403 from "../components/Error403"
import AccordionHeader from "./AccordionHeader"

const Plan = () => {
	const { authTokens } = useContext(AuthContext)
	const { id } = useParams()
	const [ includedLocations, setIncludedLocations ] = useState([])

	const { 
		loading: itineraryLoading,
		error: itineraryError,
		itinerary,
		editedName,
		setEditedName,
		getItineraryById,
		editItineraryName,
		cancelEditName, 
	} = useItineraryManager(authTokens)

	const inputRef = useRef(null)
	
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

	const [isExpenseOpen, setExpenseOpen] = useState(true)
	const [isItineraryOpen, setItineraryOpen] = useState(true)
	const [isCalendarOpen, setCalendarOpen] = useState(false)
	const [editName, setEditName] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				await getItineraryById(id)
				await getDays(id)
			}
			catch(error) {
				console.log("Error while retrieving itinerary")
			}
		}

		fetchData()
	}, [id])

	useEffect(() => {
		const locations = getMarkersData(days)
        setIncludedLocations(locations)
	}, [days]) 
	
	useEffect(() => {
		if (inputRef.current && editName) {
			inputRef.current.focus();
		}
	}, [editName])
	
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

	const toggleEditName = () => {
		setEditName(prev => !prev)
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleEditName()
		} else if (e.key === 'Escape') {
			cancelEditName()
			toggleEditName()
		}
	}

	const handleEditName = () => {
		editItineraryName(id)
		toggleEditName()
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

	if(itineraryError) {
		if (itineraryError===404) {
			return (
				<div>
					<UserNav />
					<Error404 />
				</div>
			)
		}
		else if (itineraryError===403) {
			return (
				<div>
					<UserNav />
					<Error403 />
				</div>
			)
		}
		else {
			return (
				<div>{itineraryError}</div>
			)
		}
	}

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
						<div>
							<AccordionHeader 
								active={isExpenseOpen}
								handleClick={toggleExpense}
								icon={faMoneyBill}
								text={"Expenses"}/>
							{isExpenseOpen && 
							<div className="accordion-content">
								<div >
									<p></p>
									<p>Budget</p>
								</div>
								<div >
									<p></p>
									<p>Group Size</p>
								</div>
							</div>}
						</div>
						<div>
							<AccordionHeader 
								active={isItineraryOpen}
								handleClick={toggleItinerary}
								icon={faMap}
								text={"Itinerary"}/>
							{isItineraryOpen && 
							<div className="accordion-content">
								{ getDayTabs }
							</div>
							}
						</div>
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
										defaultValue={itinerary?.number_of_people}/>
										
								</div>
								<div className="form-row">
									<label htmlFor="budget">Budget <span>(per person)</span></label>
									<input 
										type="number" 
										name="budget" 
										id="budget"
										defaultValue={itinerary?.budget}/>							
								</div>
							</div>
						</section>
						<section className="plan--itinerary-section">
							{editName ? 
							<div className="plan--itinerary-header">
								<div className="plan--itinerary-title">
									<input 
										ref={inputRef}
										value={editedName}
										placeholder={"Enter Trip Name"} 
										onChange={(e) => setEditedName(e.target.value)} 
										maxLength={60}
										onKeyDown={handleKeyPress}
										className="plan--edit-name" />
								</div>
								<FontAwesomeIcon 
									icon={faCheck} 
									onClick={handleEditName} 
									className="check-icon"/>
							</div>
							:
							<div className="plan--itinerary-header">
								<div className="plan--itinerary-title">
									<p className="plan--title">{itinerary?.name}</p>
								</div>
								<div className="plan--itinerary-header-icons">
									<FontAwesomeIcon 
										icon={faPencilAlt}
										onClick={toggleEditName} 
										className=""/>
									<FontAwesomeIcon 
										className="calendar-icon"
										onClick={toggleCalendar}
										icon={faCalendarAlt}/>
								</div>
							</div>
							}
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