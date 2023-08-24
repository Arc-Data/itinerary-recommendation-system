import { NavLink } from 'react-router-dom'

function Location(props) {

    const locationElements = Object.values(props.locations).map(location => (
        <tr key={location.id}>
            <td>{location.id}</td>
            <td><img className="location--img" src={location.imgUrl}/></td>
            <td>{location.name}</td>
            <td style={{width: '25%'}}>{location.address}</td>
            <td>{location.opening}</td>
            <td>{location.closing}</td>
            <td>View</td>
        </tr>
    ))

    return (
        <>
            <div>
                <form className="container">
                    <input 
                        type="text"
                        placeholder="Search for user..."
                        className="search--bar" 
                    />
                    <button 
                        className="btn search"
                        type="button"
                    >
                        Search
                    </button>
                    <button 
                        className="btn add-location"
                        type="button"
                    >
                        <NavLink 
                            to="/add-location"
                            className="link"
                        >
                            Add Location
                        </NavLink>
                    </button>
                </form>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Opening</th>
                    <th>Closing</th>
                    <th>Action</th>
                </tr>
                {locationElements}
            </table>
        </>
    )
}

export default Location