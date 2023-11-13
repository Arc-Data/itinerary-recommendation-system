import { Link, NavLink } from 'react-router-dom'
import searchIcon from '/images/search.png';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import useLocationManager from '../hooks/useLocationManager';

function Location() {
    const authTokens = useContext(AuthContext)
    const { result, error, loading, getLocations } = useLocationManager(authTokens)
    const [currentPage, setCurrentPage] = useState(1)
    const locationElements = result?.results.map(location => (
        <tr key={location.id}>
            <td>{location.id}</td>
            <td>
                <img className="location--img" 
                    src={`http://127.0.0.1:8000${location.primary_image}`}/></td>
            <td>{location.name}</td>
            <td style={{width: '25%'}}>{location.address}</td>
            <td>
                <Link to={`/admin/location/${location.id}`}>
                    <button className='plan--btn'>View</button>
                </Link>
            </td>
        </tr>
    ))
    
    useEffect(() => {
        const fetchResults = async () => {
            await getLocations(currentPage)
        }

        fetchResults()
    }, [currentPage])

    const totalPages = Math.ceil(result?.count / 10) || 1;
    
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearchChange = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value
            setCurrentPage(1)
            getLocations(1, query)
        }
    }
    
    const generatePageButtons = () => {
        const buttons = [];
    
        if (result?.previous) {
            buttons.push(
                <button 
                    key="prev" 
                    className='plan--btn btn-primary'
                    onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </button>
            );
        }
    
        for (let page = Math.max(currentPage - 2, 1); page <= Math.min(currentPage + 2, totalPages); page++) {
            buttons.push(
                <button 
                    key={page} 
                    className='plan--btn btn-secondary'
                    onClick={() => handlePageChange(page)} disabled={page === currentPage}>
                    {page}
                </button>
            );
        }
    
        if (result?.next) {
            buttons.push(
                <button 
                    key="next" 
                    className='plan--btn btn-primary'
                    onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
            );
        }
    
        return buttons;
    };

    if (loading) {
        return (
            <div>Loading</div>
        )
    }

    if (error) {
        return (
            <div>Error</div>
        )
    }

    return (
        <>
            <div>
                <img className='admin--search--icon' src={searchIcon} alt="Search Icon" />
                <input 
                    type="text"
                    placeholder="Search for location"
                    className="admin--search--bar" 
                    onKeyDown={handleSearchChange}
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
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="font16">ID</th>
                        <th className="font16">Image</th>
                        <th className="font16">Name</th>
                        <th className="font16">Address</th>
                        <th className="font16">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locationElements}
                </tbody>
            </table>
            <div className="pagination-container">{generatePageButtons()}</div>
        </>
    )
}

export default Location