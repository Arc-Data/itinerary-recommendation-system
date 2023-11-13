import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom"
import PreferenceOption from "../components/PreferenceOption"

const Preferences = () => {
    const { user, authTokens, userSetPreference } = useContext(AuthContext)
    const [ preferences, setPreferences ] = useState({
        "Art": false,
        "Activity": false,
        "Culture": false,
        "Entertainment": false,
        "History": false,
        "Nature": false,
        "Religion": false,
    }) 
    const [loading, setLoading] = useState(false)

    // fill this up with links for each
    // and set the url to images[idx]
    const images = [
        '/pref-art.png',
        '/pref-act.png',
        '/pref-culture.png',
        '/pref-entertainment.png',
        '/pref-history.png',
        '/pref-nature.png',
        '/pref-religion.png',
    ]

    console.log(user.set_preferences)

    if (user.set_preferences) {
        return <Navigate to="/home"/>
    }

    const onClick = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/preferences/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${String(authTokens.access)}`
                }, 
                body: JSON.stringify(preferences),
            })

            if (response.ok) {
                userSetPreference()
            }
        }
        catch(error) {
            console.log("Error :", error)
        }
    }

    const toggleOption = (name) =>  {
        setPreferences(prevData => ({
            ...prevData,
            [name]: !prevData[name]
        }))

    }

    const isButtonDisabled = Object.values(preferences).filter((value) => value).length < 2

    return (
        <div className="preferences">
            <h1>What are you looking forward to your next trip to Cebu?</h1>
            <p>Select at least two</p>
            <div className="preferences--selection-container">
            {Object.keys(preferences).map((key, index) => (
                <PreferenceOption 
                    key={index}
                    url={images[index]}
                    name={key}
                    onClick={() => toggleOption(key)}
                    isSelected={preferences[key]}
                />
            ))}
            </div>
            <button 
                className="preferences--btn"
                disabled={isButtonDisabled}
                onClick={onClick}
                >Done</button>
        </div>
    )
}

export default Preferences