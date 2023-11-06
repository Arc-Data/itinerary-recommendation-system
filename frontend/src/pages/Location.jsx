import { NavLink } from 'react-router-dom'
import searchIcon from '/images/search.png';

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
                <form className="admin--container">
                    <img className='admin--search--icon' src={searchIcon} alt="Search Icon" />
                    <input 
                        type="text"
                        placeholder="Search for location"
                        className="admin--search--bar" 
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
                            to="/admin/add-location"
                            className="link"
                        >
                            Add Location
                        </NavLink>
                    </button>
                </form>
            </div>
            <table>
                <tr>
                    <th className="font16">ID</th>
                    <th className="font16">Image</th>
                    <th className="font16">Name</th>
                    <th className="font16">Address</th>
                    <th className="font16">Opening</th>
                    <th className="font16">Closing</th>
                    <th className="font16">Action</th>
                </tr>
                {locationElements}
            </table>
        </>
    )
}

export default Location