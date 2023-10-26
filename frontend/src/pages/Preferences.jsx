import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Preferences = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    if (user.set_preference) {
        navigate('/home')
    }

    return (
        <div className="preferences">
            <h1>What are you looking forward to your next trip to Cebu?</h1>
            <p>Select at least three</p>
            <div className="preferences--selection-container">
                
            </div>
        </div>
    )
}

export default Preferences