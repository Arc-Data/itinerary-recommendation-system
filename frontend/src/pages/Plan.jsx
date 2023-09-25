import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import Day from "../components/Day"
import dayjs from "dayjs"

const Plan = () => {
  	const [itinerary, setItinerary] = useState({
		number_of_people: '1',
		budget: ''
	})
	const [isLoading, setLoading] = useState(true)
	const [days, setDays] = useState(null)
	const [isExpenseOpen, setExpenseOpen] = useState(true)
	const [isItineraryOpen, setItineraryOpen] = useState(true)
	const { authTokens } = useContext(AuthContext)
	const { id } = useParams()
	
	const toggleExpense = () => {
		console.log("hello?")
		setExpenseOpen(prev => !prev)
	}
	
	const toggleItinerary = () => {
		console.log("What")
		setItineraryOpen(prev => !prev)
	}

	useEffect(() => {
		const fetchItineraryData = async (e) => {
			const userToken = String(authTokens.access)
			const response = await fetch(`http://127.0.0.1:8000/api/plan/${id}/`, {
				'method' : 'GET',
				'headers': {
					"Content-Type" : "application/json",
					"Authorization": `Bearer ${userToken}`, 
				}
			})

			if (!response.ok) {
				throw new Error("Error fetching itinerary data");
			} 
	  
			const data = await response.json();
			setItinerary(data.itinerary)
			setDays(data.days)
			setLoading(false)
			console.log(data.itinerary)
		}

		fetchItineraryData()
	}, [ id ])

	const getDays = days && days.map(day => {
		return <Day key={day.id} day={day}/>
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

	const active = {
		background: "#184e77",
    	color: "white"
	}

	return (
    	<div className="plan--layout">
			<div className="plan--side-panel">
				<div 
					className="plan--accordion-header" 
					onClick={toggleExpense}>
					<p></p>
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
					<p></p>
					<p>Itinerary</p>
				</div>
				{isItineraryOpen && 
				<div className="plan--accordion-content">
					{ getDayTabs }
				</div>
				}
			</div>
			<div className="plan--main-panel">
				<div className="plan--expense-container">
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
				</div>
				<div className="plan--header">
					<p className="plan--title">Itinerary</p>
					<button className="plan--save-btn">Save</button>
				</div>
				{getDays}
			</div>
		</div>
  	)
}

export default Plan