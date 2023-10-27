import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import PreferenceOption from "../components/PreferenceOption"

const Preferences = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [ data, setData ] = useState({
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

    ]

    const onClick = () => {

    }

    const toggleOption = (name) =>  {
        setData(prevData => ({
            ...prevData,
            [name]: !prevData[name]
        }))

    }

    if (user.set_preference) {
        navigate('/home')
    }

    const selectedCount = Object.values(data).filter((value) => value).length
    const isButtonDisabled = selectedCount < 2

    console.log(data)

    return (
        <div className="preferences">
            <h1>What are you looking forward to your next trip to Cebu?</h1>
            <p>Select at least two</p>
            <div className="preferences--selection-container">
            {Object.keys(data).map((key, index) => (
                <PreferenceOption 
                    key={index}
                    url={'/beach.jpg'}
                    name={key}
                    onClick={() => toggleOption(key)}
                    isSelected={data[key]}
                />
            ))}
            </div>
            <button 
                className="preferences--btn"
                disabled={isButtonDisabled}
                >Done</button>
        </div>
    )
}

export default Preferences