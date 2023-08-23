import React, { useState } from 'react';
import userIcon from "/images/user.png";
import searchIcon from "/images/search.png";
import { Link } from 'react-router-dom';

export default function UserNav() {
  const [logoutPopupVisible, setLogoutPopupVisible] = useState(false);

  const toggleLogoutPopup = () => {
    setLogoutPopupVisible(!logoutPopupVisible);
  };

  return (
    <nav className='user--navbar'>
      <Link to="/">
        <img className="cebu--route" src="../images/Untitled design.png" alt="LandingPage" />
      </Link>

      <div className='search--bar-container'>
        <img className='search--icon' src={searchIcon} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search CebuRoute"
          className='search--bar'
        />
      </div>

      <div className='link'>
        <img
          src={userIcon} 
          alt="User Icon"
          className='user--logo'
          onClick={toggleLogoutPopup}
        />
        {logoutPopupVisible && (
          <div className="logout--popup">
            <button onClick={toggleLogoutPopup}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
