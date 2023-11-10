import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import AuthContext from "../context/AuthContext"
import Recommendation from "./Recommendation"
import useRecommendationsManager from "../hooks/useRecommendationsManager"

const Assistant = ({onClose, day, updateDays}) => {
    const { authTokens } = useContext(AuthContext)
    const { loading, status, recommendations, applyRecommendation, fetchRecommendations } = useRecommendationsManager(authTokens)
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

    const handleApplyRecommendation = async (e) => {
        try {
            const data = await applyRecommendation(selectedItem, day.id);
            updateDays(day.id, data.day)
        }
        catch(error) {
            console.log("An error occured: ", error)
        }
        finally {
            onClose()
        }

    }

    useEffect(() => {
        fetchRecommendations()
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
                    { loading ? 
                    <div>{status}</div>
                    :
                    <>
                    <p>Choose 1 from the list genereated. Note that this will replace the itinerary you created in <span className="assistant--date">{formatDate(day.date)}</span>.</p>
                    <div className="assistant--content-grid">
                        {displayRecommendations}
                    </div>
                    </>
                    }
                </div>
                { !loading &&
                <div className="assistant--footer">
                    <button className="assistant--btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button
                        disabled={!selectedItem ? true : false} 
                        className="assistant--btn btn-primary"
                        onClick={handleApplyRecommendation}>
                            Done
                    </button>
                </div>
                }
            </div>
        </>
    )
}

export default Assistant