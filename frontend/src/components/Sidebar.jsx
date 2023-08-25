import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {

    const [dropdown, setDropdown] = React.useState(false)

    function toggleLocationDropdown() {
        setDropdown(prev => !prev)
    }

    return (
        <div className="sidebar">
            <h1>Hello, admin!</h1>
            <div className="sidebar--menu">
                <NavLink  
                    className={({isActive}) => isActive ? 'active' : 'link'}
                    to="/"
                >
                    Users
                </NavLink>
                <NavLink
                    className={({isActive}) => isActive ? 'active' : 'link'}
                    to="/location"
                    onClick={toggleLocationDropdown}
                >
                    Locations
                </NavLink>
                {dropdown && (
                    <>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active-drp dropdown' : 'link dropdown')}
                            to="/location"
                        >
                            Tour
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active-drp dropdown' : 'link dropdown')}
                            to="/accommodation"
                        >
                            Accommodation
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active-drp dropdown' : 'link dropdown')}
                            to="/activity"
                        >
                            Activity
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => (isActive ? 'active-drp dropdown' : 'link dropdown')}
                            to="/food"
                        >
                            Food
                        </NavLink>
                    </>
                )}
            </div>
            <button className="btn logout"> 
                Logout
            </button>
        </div>
    )
}

export default Sidebar