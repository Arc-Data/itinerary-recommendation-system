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
                        <option value="tour">Tour</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="activity">Activity</option>
                        <option value="food">Food</option>
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
                    <div className="admin--container">
                        <div className="input admin--container">
                            <label htmlFor="openingHours">Opening Hours</label>
                            <input
                                type="time"
                                onChange={handleChange}
                                name="openingHours"
                                value={locationData.openingHours}
                                className="styled-input" 
                            />
                        </div>
                        <div className="input admin--container">
                            <label htmlFor="closingHours">Closing Hours</label>
                            <input
                                type="time"
                                onChange={handleChange}
                                name="closingHours"
                                value={locationData.closingHours}
                                className="styled-input" 
                            />
                        </div>
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
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="city"
                                value={locationData.city}
                                className="styled-input" 
                            />
                        </div>
                        <div className="input admin--container">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                onChange={handleChange}
                                name="postalCode"
                                value={locationData.postalCode}
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
