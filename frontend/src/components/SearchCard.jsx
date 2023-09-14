import React from "react"

export default function SearchCard (props) {
    return (
        <div className="searchPage--details">  
            <div className="searchPage--picture"> 
                <img className="searchPage--pic" src={`http://127.0.0.1:8000${props.primary_image}`}  />
            </div>
            
            <div className="searchPage--info">
                <h2 className="searchPage--info-title">{props.name}</h2>
                <span className="searchPage--info-address">{props.address}</span>
            </div>
        </div>
    )
}