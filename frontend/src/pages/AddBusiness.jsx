import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const AddBusiness = () => {
    const { authTokens } = useContext(AuthContext)
    const navigate = useNavigate()
    const [locationData, setLocationData] = useState({
        'name': '',
        'address': '',
        'longitude': 0,
        'latitude': 0,
        'type': '',
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLocationData(prev => ({
            ...prev,
            [name]: value,
        }))

    }

    const checkInvalid = () => {
        return !locationData.name ||
            !locationData.address ||
            locationData.longitude == 0 ||
            locationData.latitude == 0 ||
            locationData.type === ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!checkInvalid()) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/location/request/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${String(authTokens.access)}`
                    },
                    body: JSON.stringify(locationData)
                })

                console.log(response)

                navigate('/profile/business')
                
            }
            catch(error) {

            }
        } else {
            console.log("Invalid Inputs")
        }
    }
    
    return (
        <div className="profile--main-container">
            <form action="POST" onSubmit={handleSubmit}>
                <div className="business--form-container">
                    <div className="business--form-section">
                        <div className="business--form-header">General Information</div>
                        <div className="form-group">
                            <label htmlFor="name">Location Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                value={locationData.name}
                                onChange={handleInputChange}
                                placeholder="Enter Location Name" 
                                className="business-input"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Location Address</label>
                            <input 
                                type="text" 
                                name="address" 
                                id="address" 
                                value={locationData.address}
                                onChange={handleInputChange}
                                placeholder="Enter Location Address" 
                                className="business-input"/>
                        </div>

                        <div className="form-column-group">
                            <div className="form-group">
                                <label htmlFor="address">Longitude</label>
                                <input 
                                    type="number" 
                                    name="longitude" 
                                    id="longitude" 
                                    value={locationData.longitude}
                                    onChange={handleInputChange}
                                    className="business-input"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Latitude</label>
                                <input 
                                    type="number" 
                                    name="latitude" 
                                    id="latitude" 
                                    value={locationData.latitude}
                                    onChange={handleInputChange}
                                    className="business-input"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Location Type</label>
                            <select 
                                name="type" 
                                id="type" 
                                value={locationData.type}
                                onChange={handleInputChange} 
                                className="business-input">
                                <option value="" disabled>-- Location Type --</option>
                                <option value="1">Tourist Spot</option>
                                <option value="2">Restaurant/Food Establishment</option>
                                <option value="3">Accommodation</option>
                            </select>
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddBusiness