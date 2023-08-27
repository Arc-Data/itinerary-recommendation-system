import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import searchIcon from '/images/search.png'
import userIcon from '/images/user.png'

const UserNav = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const { logoutUser } = useContext(AuthContext)

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
    };

    return (
        <nav className='user--navbar'>
            <Link to="/">
            <img className="cebu--route" src="../images/Untitled design.png" alt="LandingPage" />
            </Link>

            <div className='user--search'>
                <div className='search--bar-container'>
                    <img className='search--icon' src={searchIcon} alt="Search Icon" />
                    <input
                        type="search"
                        placeholder="Search CebuRoute"
                        className='search--bar' />
                </div>
            </div>


            <div className='link'>
            <div className='user--dropdown' onClick={togglePopup}>
            <img
            src={userIcon} 
            alt="User Icon"
            className='user--logo'
            />
            {popupVisible && (
            <div className="user--dropdown-content">
            <button>View Itinerary</button>
            <button onClick={logoutUser}>Logout</button>
            </div>
            )}
            </div>
            </div>
        </nav>
    )
}

export default UserNav