import { useState } from 'react'
import image from '/image.png'

function AddLocation() {

    const [locationData, setLocationData] = useState(
        {
            type: "",
            name: "",
            openingHours: "",
            closingHours: "",
            address: "",
            city: "",
            postalCode: "",
            description: ""
        }
    )

    console.log(locationData)

    function handleChange(event) {
        const {name, value} = event.target
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
            <form className="container">
                <div className="input--form">
                    <select
                        value={locationData.type}
                        onChange={handleChange}
                        name="type"
                    >
                        <option value="">-- Location Type --</option>
                        <option value="tour">Tour</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="activity">Activity</option>
                        <option value="food">Food</option>
                    </select>

                    <div className="input container">
                        <label htmlFor="name">Location Name</label>
                        <input 
                           type="text"
                           onChange={handleChange}
                           name="name"
                           value={locationData.name}
                        />
                    </div>
                    <div className="container">
                        <div className="input container">
                            <label htmlFor="openingHours">Opening Hours</label>
                            <input 
                                type="time"
                                onChange={handleChange}
                                name="openingHours"
                                value={locationData.openingHours}
                            />
                        </div>
                        <div className="input container">
                            <label htmlFor="closingHours">Closing Hours</label>
                            <input 
                                type="time"
                                onChange={handleChange}
                                name="closingHours"
                                value={locationData.closingHours}
                            />
                        </div>
                    </div>
                    <div className="input container">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text"
                            onChange={handleChange}
                            name="address"
                            value={locationData.address}
                        />
                    </div>
                    <div className="container">
                        <div className="input container">
                            <label htmlFor="city">City</label>
                            <input 
                                type="text"
                                onChange={handleChange}
                                name="city"
                                value={locationData.city}
                            />
                        </div>
                        <div className="input container">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input 
                                type="text"
                                onChange={handleChange}
                                name="postalCode"
                                value={locationData.postalCode}
                            />
                        </div>
                        
                    </div>
                    <div className="input container">
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
                    >
                        Done
                    </button>
                </div>
                <div className="image--border center container">
                    <img src={image} />
                    <label htmlFor="imgFile">Choose file to upload</label>
                    <input 
                        type="file" 
                        id="imgFile" 
                        name="filename"
                        accept="image/*"
                    />
                </div>
            </form>
        </>
        
    )
}

export default AddLocation