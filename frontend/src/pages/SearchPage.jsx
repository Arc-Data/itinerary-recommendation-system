import React from 'react';
/*COMPONENTS*/
import Footer from '../components/Footer';
import SearchCard from '../components/SearchCard';
/*DATA*/
import cardData from '../cardData';

export default function SearchPage() {
    
    // const search = cardData.map(item => (
    //     <SearchCard key={item.id} {...item} />
    //   ));

    return (
        <div>
            <div className="searchPage--container">
                <h1 className="searchPage--title">Search result for "Moalboal"</h1>
                <p className="searchPage--result">12 of 12 results</p>
                <div className="searchPage--navbar">
                    <a href="#">All Results</a>
                    <a href="#">Destination</a>
                    <a href="#">Accommodation</a>
                    <a href="#">Restaurant</a>
                    <a href="#">Activities</a>
                </div>
                <div className="searchPage--card">
                    {/* insert cards here */}
                </div>
            </div>
        </div>
    )
}
     
