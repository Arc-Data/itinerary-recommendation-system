import React, { useEffect, useState } from 'react';
/*Components*/
import SearchCard from '../components/SearchCard';
/*Data*/
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    // initially set data to null, should contain an array of data depending on query
    const [locations, setLocations] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("query")

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`http://127.0.0.1:8000/api/location/?query=${query}`)  
            const data = await response.json()
            setLocations(data)
        }

        fetchData()

    }, [query])
    
    const locationResults = locations && locations.map(location => {
        return <SearchCard key={location.id} {...location} />
    })
    
    return (
        <div>
            <div className="searchPage--container">
                <h1 className="searchPage--title">Search result for "{`${query}`}"</h1>
                <p className="searchPage--result">{locations ? locations.length : "0"} of {locations ? locations.length : "0"} Results</p>
                <div className="searchPage--navbar">
                    <a href="#">All Results</a>
                    <a href="#">Destination</a>
                    <a href="#">Accommodation</a>
                    <a href="#">Restaurant</a>
                    <a href="#">Activities</a>
                </div>
                <div className="searchPage--card">
                    {locationResults}
                </div>
            </div>
        </div>
    )
}
    
export default SearchPage;