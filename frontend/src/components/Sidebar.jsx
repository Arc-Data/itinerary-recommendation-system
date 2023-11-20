import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaMapMarkerAlt, FaUser, FaAngleUp, FaAngleDown, FaReceipt } from 'react-icons/fa'; // Import arrow icons

function Sidebar() {
    const { logoutUser } = useContext(AuthContext);
    const [dropdown, setDropdown] = React.useState(false);

    function toggleLocationDropdown() {
        setDropdown((prev) => !prev);
    }

    return (
        <div className="sidebar">
            <div className="admin--icon">
                <div className="user-icon-circle">
                    <FaUser />
                </div>
                <h1 className="admin--text">
                    Hello, admin <span className="admin14">!</span>
                </h1>
            </div>
            <div className="sidebar--menu">
                <NavLink
                    className={({ isActive }) => isActive ? 'active' : 'link'}
                    to="/"
                >
                    <h4 className="users">
                        <FaUser /> Users
                    </h4>
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'active' : 'link'}
                    to="/admin/locations"
                    onClick={toggleLocationDropdown}
                >
                    <h4 className="locations">
                        <FaMapMarkerAlt /> Locations{' '}
                        <div className='arrow--icon'>
                        {dropdown ? <FaAngleUp /> : <FaAngleDown />} 
                        </div>
                        
                    </h4>
                </NavLink>
                {dropdown && (
                    <>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active-drp dropdown' : 'link dropdown')}
                            to="/admin/locations?type=spot"
                        >
                            Tourist Spot
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active-drp dropdown' : 'link dropdown')}
                            to="/admin/locations?type=accomodation"
                        >
                            Accommodation
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active-drp dropdown' : 'link dropdown')}
                            to="/admin/locations?type=food"
                        >
                            Food
                        </NavLink>
                    </>
                )}
                <NavLink
                    className={({ isActive }) => isActive ? 'active' : 'link'}
                    to="requests"
                >
                    <h4 className="users">
                        <FaReceipt /> Requests
                    </h4>
                </NavLink>
            </div>
            <button className="btn logout" onClick={logoutUser}>
                Logout
            </button>
            <a className="admin--copyright">© 2023 CebuRoute. All rights reserved.</a>
        </div>
    );
}

export default Sidebar;
