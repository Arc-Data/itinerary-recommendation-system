import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"

const Assistant = ({onClose, day}) => {
    const [loading, setLoading] = useState(true)
    const [recommendations, setRecommendations] = useState([])
    const { authTokens } = useContext(AuthContext)

    const formatDate = (day) => {
        return dayjs(day.date).format("MMM D YYYY, dddd")
    }

    const getRecommendations = async (e) => {
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
            console.log(data.recommendations)
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
        getRecommendations()
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
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                    }
                </div>

                <div className="assistant--footer">
                    <button className="assistant--btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="assistant--btn btn-primary">Done</button>
                </div>
            </div>
        </>
    )
}

export default Assistant