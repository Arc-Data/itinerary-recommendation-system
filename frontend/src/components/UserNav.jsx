import React, { useState } from 'react';
import userIcon from "/images/user.png";
import searchIcon from "/images/search.png";
import { Link } from 'react-router-dom';

export default function UserNav() {
  const [popupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
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
        <div className='user--dropdown' onClick={togglePopup}>
          <img
            src={userIcon} 
            alt="User Icon"
            className='user--logo'
          />
          {popupVisible && (
            <div className="user--dropdown-content">
              <button>View Itinerary</button>
              <button>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
