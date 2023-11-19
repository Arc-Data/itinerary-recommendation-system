import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import searchIcon from '/images/search.png';

const UserNav = () => {
    const [dropdown, setDropdown] = useState(false);
    const { logoutUser, user } = useContext(AuthContext)
    const letter = user.email[0].toUpperCase()
    const navigate = useNavigate()


    const toggleDropdown = () => {
        setDropdown(prev => !prev);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        const searchQuery = e.target.search.value
        navigate({
            pathname: "/search",
            search: createSearchParams({
                query: searchQuery
            }).toString()
        })
    }

    return (
        <nav className='user--navbar'>
            <div className='nav-wrapper'>
                <Link to = "/home">
                    <img className="cebu--route" src="/images/logo.png" alt="LandingPage" />
                </Link>
                <form onSubmit={handleSearchSubmit} method="GET">
                    <div className='user--search'>
                        <div className='search--bar-container'>
                            <img className='search--icon' src={searchIcon} alt="Search Icon" />
                            <input
                                type="search"
                                placeholder="Search CebuRoute"
                                className='search--bar' 
                                name="search" />
                        </div>
                    </div>
                </form>

                <div className='user--links'>
                    <Link to="/create">
                        <button className='user--create-trip'>Create a new trip</button>
                    </Link>
                    <div className='user--profile' onClick={toggleDropdown}>
                        <p>{letter}</p>
                        {dropdown && 
                        <div className="user--dropdown-content">
                            <Link to="/profile">
                                Profile
                            </Link>
                            <button onClick={logoutUser}>Logout</button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default UserNav
