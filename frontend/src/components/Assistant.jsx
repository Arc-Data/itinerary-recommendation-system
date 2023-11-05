import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import Recommendation from "./Recommendation"

const Assistant = ({onClose, day, setItems}) => {
    const [loading, setLoading] = useState(true)
    const [recommendations, setRecommendations] = useState([])
    const { authTokens } = useContext(AuthContext)
    const [selectedItem, setSelectedItem] = useState() 

    const formatDate = (day) => {
        return dayjs(day.date).format("MMM D YYYY, dddd")
    }

    const displayRecommendations = recommendations && recommendations.map((recommendation, idx) => {
        return <Recommendation 
                recommendation={recommendation} 
                onClick={() => handleClick(recommendation.id)}
                selected={selectedItem === recommendation.id}
                key={recommendation.id}/>
    })

    const handleClick = (id) => {
        setSelectedItem(id)
    }

    const applyRecommendation = async (e) => {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/recommendations/${selectedItem}/apply/`, {
                'method' : 'POST',
                'headers': {
                    "Content-Type" : "application/json",
                },
                'body': JSON.stringify({
                    'day_id': day.id
                })
            })

            const data = await response.json();
            setItems(data.items)
        }
        catch(error) {
            console.log("An error occured: ", error)
        }
        finally {
            setLoading(false)
        }

    }

    const fetchRecommendations = async (e) => {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/recommendations/content/`, {
                'method' : 'GET',
                'headers': {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${String(authTokens.access)}`, 
                }
            })

            const data = await response.json()
            setRecommendations(data.recommendations)
        }
        catch(error) {
            console.log("An error occured")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRecommendations()
        setLoading(false)
    }, [])

    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="assistant">
                <div className="assistant--header">
                    <p className="assistant--header-title">AI Assistant</p>
                    <p>Use AI Assistant to generate your itinerary</p>
                </div>
                <div className="assistant--content">
                    <p>Choose 1 from the list genereated. Note that this will replace the itinerary you created in <span className="assistant--date">{formatDate(day.date)}</span>.</p>
                    { loading ? 
                    <div>Loading Recommendations...</div>
                    :
                    <div className="assistant--content-grid">
                        {displayRecommendations}
                    </div>
                    }
                </div>

                <div className="assistant--footer">
                    <button className="assistant--btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button
                        disabled={!selectedItem ? true : false} 
                        className="assistant--btn btn-primary"
                        onClick={applyRecommendation}>
                            Done
                    </button>
                </div>
            </div>
        </>
    )
}

export default Assistant