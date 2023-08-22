import React, { useState } from 'react';
/*COMPONENTS*/
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
/*DATA*/
import cardData from '../cardData';
/*PAGES*/
import Login from '../pages/Login.jsx';


export default function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const openLoginModal = () => { setShowLoginModal(true); };
  const closeLoginModal = () => { setShowLoginModal(false); };

  const cards = cardData.map(item => (
    <Card key={item.id} {...item} />
  ));

  return (
    <div>
      <Navbar />
      <div className='hero'>
        <div className='title'>
          <h1 className='title--h1'>Plan your next trip to Cebu</h1>
          <p className='title--p'>
            Discover the best routes, attractions, food places and accommodations for your
            Cebu trip with CebuRoute's expert guidance.
          </p>
          <button className='button--started' onClick={openLoginModal}>
            Get Started
          </button>
        </div>
        <div className='hero--route'>
          <img className='hero--route-photo' src='../images/1.png' alt='Route' />
        </div>
      </div>
      <div className='hero--map'>
          <div className='hero--map-photo1'>
            <img className='hero--map-photo' src="../images/3.png" />
           </div>
        <div className='hero--map-text'>
          <h1 className='hero--h1'>See your itinerary in one view</h1>
           <p className='hero--p'>No more switching between apps and tabs to plan your trip.</p>
        </div>
      </div>
      <div className='hero--destination'>
        <h1 className='hero--destination-title'>Discover Destination</h1>
          <div className='hero--cards'>
            {cards}
          </div>
      </div>
      <Footer />
      {showLoginModal && <Login onClose={closeLoginModal} />}
    </div>
  );
}