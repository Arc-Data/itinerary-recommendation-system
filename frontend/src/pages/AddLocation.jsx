import { useContext, useState } from 'react'
import image from '/image.png'
import AuthContext from '../context/AuthContext'
import useLocationManager from '../hooks/useLocationManager'
import { useNavigate } from 'react-router-dom'

function AddLocation() {
    const { authTokens } = useContext(AuthContext)
    const [locationData, setLocationData] = useState(
        {
            type: "",
            name: "",
            address: "",
            latitude: "",
            longitude: "",
            description: ""
        }
    )
    const navigate = useNavigate()
    const { createLocation } = useLocationManager(authTokens)

    const handleSubmit = async () => {
        // if (validateForm()) {
            const formData = new FormData();
    
            Object.entries(locationData).forEach(([key, value]) => {
                formData.append(key, value);
            });
    
            const imageFileInput = document.getElementById('imgFile');
            if (imageFileInput.files.length > 0) {
                formData.append('image', imageFileInput.files[0]);
            }
    
            try {
                const id = await createLocation(formData)
                navigate(`/admin/location/${id}`)

            } catch (error) {
                console.error(error);
            }
        // }
    };

    const validateForm = () => {
        return (
            locationData.type.trim() !== '' &&
            locationData.name.trim() !== '' &&
            locationData.address.trim() !== '' &&
            locationData.latitude.trim() !== '' &&
            locationData.longitude.trim() !== '' &&
            locationData.description.trim() !== ''
        );
    };

    const handleChange = (event) =>  {
        const { name, value } = event.target
        setLocationData(prevLocationData => {
            return {
                ...prevLocationData,
                [name]: value
            }
        })
    }

    return (
        <>
            <h1>Add Location</h1>
            <form className="admin--container">
                <div className="input--form">
                    <select
                        value={locationData.type}
                        onChange={handleChange}
                        name="type"
                        className="styled-input" 
                    >
                        <option value="">-- Location Type --</option>
                        <option value="1">Spot</option>
                        <option value="2">Food</option>
                        <option value="3">Accommodation</option>
                    </select>

                    <div className="input admin--container">
                        <label htmlFor="name">Location Name</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="name"
                            value={locationData.name}
                            className="styled-input" 
                        />
                    </div>
                    
                    <div className="input admin--container">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="address"
                            value={locationData.address}
                            className="styled-input" 
                        />
                    </div>
                    <div className="admin--container">
                        <div className="input admin--container">
                            <label htmlFor="latitude">Latitude</label>
                            <input
                                type="number"
                                step="0.000001"
                                onChange={handleChange}
                                name="latitude"
                                value={locationData.latitude}
                                className="styled-input" 
                            />
                        </div>
                        <div className="input admin--container">
                            <label htmlFor="postalCode">Longitude</label>
                            <input
                                number="text"
                                step="0.000001"
                                onChange={handleChange}
                                name="longitude"
                                value={locationData.longitude}
                                className="styled-input" 
                            />
                        </div>
                    </div>
                    <div className="input admin--container">
                        <label htmlFor="description">Description</label>
                        <textarea
                            onChange={handleChange}
                            name="description"
                            value={locationData.description}
                            
                        />
                    </div>
                    <button
                        type="button"
                        className="btn done"
                        onClick={handleSubmit}
                    >
                        Upload
                    </button>
                </div>
                <div className="image--border center admin--container">
                    <img src={image} />
                    <label htmlFor="imgFile"> <a className='choose--file'>Choose file</a> to upload</label>
                    <input
                        type="file"
                        id="imgFile"
                        name="filename"
                        accept="image/*"
                        style={{ display: 'none' }} // Hide the default file input
                    />
                </div>
            </form>
        </>

    )
}

export default AddLocation
